import { NextRequest, NextResponse } from 'next/server';
import { dbStore } from '@/lib/db/store';

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || '';
    let itemsToImport: Array<{
      certificationId: string;
      voucherCode: string;
      expiryDate: string;
      region: string;
      redemptionInstructions: string;
      supplierReference?: string;
    }> = [];

    if (contentType.includes('application/json')) {
      const body = await request.json();
      if (Array.isArray(body)) {
        itemsToImport = body;
      } else if (body.items && Array.isArray(body.items)) {
        itemsToImport = body.items;
      } else if (body.csv) {
        itemsToImport = parseCsvVouchers(body.csv);
      }
    } else if (contentType.includes('text/csv') || contentType.includes('multipart/form-data')) {
      const text = await request.text();
      itemsToImport = parseCsvVouchers(text);
    } else {
      const text = await request.text();
      itemsToImport = parseCsvVouchers(text);
    }

    if (!itemsToImport.length) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'No voucher records parsed. Please provide JSON array or CSV data with columns: certificationId, voucherCode, expiryDate, region, redemptionInstructions, supplierReference.' 
        },
        { status: 400 }
      );
    }

    const importResult = dbStore.importVoucherBatch(itemsToImport);

    return NextResponse.json({
      success: importResult.success,
      importedCount: importResult.insertedCount,
      failedCount: importResult.errors.length,
      errors: importResult.errors,
      message: `Successfully imported ${importResult.insertedCount} vouchers into private inventory.`,
    });
  } catch (error) {
    console.error('Error in /api/admin/inventory/import:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error processing voucher import' },
      { status: 500 }
    );
  }
}

function parseCsvVouchers(csvContent: string) {
  const lines = csvContent.split(/\r?\n/).filter(line => line.trim().length > 0);
  if (lines.length <= 1) return [];

  // Header line
  const header = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/[^a-z0-9]/g, ''));
  const certIdIndex = header.findIndex(h => h.includes('cert') || h.includes('exam'));
  const codeIndex = header.findIndex(h => h.includes('code') || h.includes('voucher'));
  const expiryIndex = header.findIndex(h => h.includes('expir') || h.includes('date'));
  const regionIndex = header.findIndex(h => h.includes('region') || h.includes('country'));
  const instructIndex = header.findIndex(h => h.includes('instruct') || h.includes('redemption'));
  const supplierIndex = header.findIndex(h => h.includes('supplier') || h.includes('reference') || h.includes('po'));

  const items: Array<{
    certificationId: string;
    voucherCode: string;
    expiryDate: string;
    region: string;
    redemptionInstructions: string;
    supplierReference?: string;
  }> = [];

  for (let i = 1; i < lines.length; i++) {
    const rawLine = lines[i];
    // Basic CSV token parser handling quotes
    const cols = rawLine.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(c => c.trim().replace(/^"|"$/g, ''));
    if (cols.length < 3) continue;

    const certId = certIdIndex >= 0 ? cols[certIdIndex] : cols[0];
    const voucherCode = codeIndex >= 0 ? cols[codeIndex] : cols[1];
    const expiryDate = expiryIndex >= 0 ? cols[expiryIndex] : cols[2];
    const region = regionIndex >= 0 && cols[regionIndex] ? cols[regionIndex] : 'India / Global';
    const redemptionInstructions = instructIndex >= 0 && cols[instructIndex] ? cols[instructIndex] : 'Redeem via official exam testing center checkout.';
    const supplierReference = supplierIndex >= 0 ? cols[supplierIndex] : 'CSV-BATCH';

    items.push({
      certificationId: certId,
      voucherCode,
      expiryDate,
      region,
      redemptionInstructions,
      supplierReference,
    });
  }

  return items;
}
