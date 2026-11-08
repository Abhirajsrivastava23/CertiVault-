import { NextRequest, NextResponse } from 'next/server';
import Papa from 'papaparse';
import { CERTIFICATIONS } from '@/lib/data/certifications';
import { store, PrivateVoucher } from '@/lib/services/store';

export async function POST(req: NextRequest) {
  try {
    // Check Admin API Key or Authorization header
    const authHeader = req.headers.get('authorization') || req.headers.get('x-admin-key');
    const adminKey = process.env.ADMIN_API_KEY || 'cv_admin_supersecret_key_2026';

    const providedKey = authHeader?.replace(/^Bearer\s+/i, '');
    if (!providedKey || providedKey !== adminKey) {
      return NextResponse.json({ error: 'Unauthorized: Invalid or missing Admin API Key' }, { status: 401 });
    }

    const contentType = req.headers.get('content-type') || '';
    let rows: any[] = [];

    if (contentType.includes('text/csv') || contentType.includes('multipart/form-data')) {
      const text = await req.text();
      const parsed = Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
        transformHeader: h => h.trim().toLowerCase().replace(/[^a-z0-9]/g, '_'),
      });
      rows = parsed.data;
    } else {
      const json = await req.json();
      rows = Array.isArray(json) ? json : json.vouchers || [];
    }

    if (!rows.length) {
      return NextResponse.json({ error: 'No inventory rows found to import' }, { status: 400 });
    }

    const validationErrors: string[] = [];
    const validBatch: Omit<PrivateVoucher, 'id' | 'status' | 'revealCount'>[] = [];
    const existingInventory = store.getInventory();
    const existingCodes = new Set(existingInventory.map(v => v.voucherCode.trim()));

    const today = new Date().toISOString().split('T')[0];

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const rowNum = i + 1;

      // Extract field variations from CSV or JSON
      const certId = (row.certification_id || row.certificationid || row.cert_id || row.exam_code || '').trim();
      const voucherCode = (row.voucher_code || row.vouchercode || row.code || '').trim();
      const expiryDate = (row.expiry_date || row.expirydate || row.expiry || '').trim();
      const region = (row.region || 'India / South Asia').trim();
      const redemptionInstructions = (
        row.redemption_instructions ||
        row.redemptioninstructions ||
        row.instructions ||
        'Apply voucher code during Pearson VUE or test center checkout.'
      ).trim();
      const supplierReference = (row.supplier_reference || row.supplierreference || 'BATCH-MANUAL').trim();

      // 1. Check required fields
      if (!certId || !voucherCode || !expiryDate) {
        validationErrors.push(`Row ${rowNum}: Missing required fields (certification_id, voucher_code, or expiry_date).`);
        continue;
      }

      // 2. Validate certification mapping (by ID, exam code, or slug)
      const matchedCert = CERTIFICATIONS.find(
        c =>
          c.id.toLowerCase() === certId.toLowerCase() ||
          c.examCode.toLowerCase() === certId.toLowerCase() ||
          c.slug.toLowerCase() === certId.toLowerCase()
      );

      if (!matchedCert) {
        validationErrors.push(`Row ${rowNum}: Certification "${certId}" does not exist in catalog.`);
        continue;
      }

      // 3. Detect duplicate codes
      if (existingCodes.has(voucherCode)) {
        validationErrors.push(`Row ${rowNum}: Duplicate voucher code "${voucherCode}" already exists.`);
        continue;
      }

      // 4. Validate expiry
      if (expiryDate <= today) {
        validationErrors.push(`Row ${rowNum}: Voucher expiry date "${expiryDate}" is in the past.`);
        continue;
      }

      // Add to verified set
      existingCodes.add(voucherCode);
      validBatch.push({
        certificationId: matchedCert.id,
        certificationSlug: matchedCert.slug,
        voucherCode,
        expiryDate,
        region,
        redemptionInstructions,
        supplierReference,
      });
    }

    if (validBatch.length === 0) {
      return NextResponse.json({
        success: false,
        importedCount: 0,
        errors: validationErrors,
      }, { status: 400 });
    }

    const { added, errors } = store.importVouchers(validBatch);

    return NextResponse.json({
      success: true,
      importedCount: added,
      failedCount: validationErrors.length + errors.length,
      errors: [...validationErrors, ...errors],
    });
  } catch (err: any) {
    console.error('Inventory import error:', err);
    return NextResponse.json({ error: 'Failed to process inventory import' }, { status: 500 });
  }
}
