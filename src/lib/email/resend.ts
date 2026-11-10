const resendApiKey = process.env.RESEND_API_KEY;

export interface SendOrderConfirmationParams {
  toEmail: string;
  customerName: string;
  orderNumber: string;
  certificationName: string;
  examCode: string;
  totalAmountInr: number;
}

export async function sendOrderConfirmationEmail(params: SendOrderConfirmationParams): Promise<boolean> {
  const formattedAmount = `₹${(params.totalAmountInr / 100).toLocaleString('en-IN')}`;

  if (resendApiKey) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'CertiVault Orders <orders@certivault.in>',
          to: params.toEmail,
          subject: `Order Confirmed: ${params.certificationName} Voucher (${params.orderNumber})`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0B1020; color: #FFFFFF; padding: 32px; border-radius: 12px;">
              <div style="text-align: center; margin-bottom: 24px;">
                <h1 style="color: #3B82F6; margin: 0; font-size: 26px; font-weight: 700;">CertiVault</h1>
                <p style="color: #94A3B8; font-size: 14px; margin-top: 4px;">Your Certification. Your Career. Your Next Opportunity.</p>
              </div>
              
              <div style="background-color: #111827; border: 1px solid #1F2B47; border-radius: 8px; padding: 24px; margin-bottom: 24px;">
                <h2 style="color: #10B981; font-size: 18px; margin-top: 0;">Payment Verified & Order Fulfilled</h2>
                <p style="color: #E2E8F0; font-size: 15px;">Hello ${params.customerName},</p>
                <p style="color: #CBD5E1; font-size: 14px; line-height: 1.6;">
                  Thank you for purchasing your authorized certification voucher from CertiVault. Your order has been verified and your voucher has been allocated to your secure customer vault.
                </p>

                <table style="width: 100%; border-collapse: collapse; margin-top: 16px; margin-bottom: 16px;">
                  <tr>
                    <td style="color: #94A3B8; padding: 8px 0; border-bottom: 1px solid #1F2B47;">Order Number:</td>
                    <td style="color: #F8FAFC; font-weight: 600; text-align: right; padding: 8px 0; border-bottom: 1px solid #1F2B47;">${params.orderNumber}</td>
                  </tr>
                  <tr>
                    <td style="color: #94A3B8; padding: 8px 0; border-bottom: 1px solid #1F2B47;">Certification:</td>
                    <td style="color: #F8FAFC; font-weight: 600; text-align: right; padding: 8px 0; border-bottom: 1px solid #1F2B47;">${params.certificationName} (${params.examCode})</td>
                  </tr>
                  <tr>
                    <td style="color: #94A3B8; padding: 8px 0;">Total Paid:</td>
                    <td style="color: #3B82F6; font-weight: 700; text-align: right; padding: 8px 0; font-size: 16px;">${formattedAmount}</td>
                  </tr>
                </table>

                <div style="text-align: center; margin-top: 24px;">
                  <a href="https://certivault.in/dashboard/vouchers" style="background-color: #3B82F6; color: #FFFFFF; text-decoration: none; padding: 12px 28px; border-radius: 6px; font-weight: 600; display: inline-block;">Access Secure Voucher Vault</a>
                </div>
              </div>

              <div style="color: #64748B; font-size: 12px; line-height: 1.5; text-align: center;">
                <p>For your security, voucher codes are masked in email communications and accessible only through your authenticated CertiVault dashboard.</p>
                <p>© ${new Date().getFullYear()} CertiVault Technologies Inc. All rights reserved.</p>
              </div>
            </div>
          `,
        }),
      });

      return res.ok;
    } catch (err) {
      console.error('Failed to send order email via Resend API:', err);
      return false;
    }
  }

  // Fallback audit log in local / development
  console.log(`[EMAIL AUDIT - DEV] Order confirmation email to ${params.toEmail} for Order ${params.orderNumber} (${formattedAmount})`);
  return true;
}
