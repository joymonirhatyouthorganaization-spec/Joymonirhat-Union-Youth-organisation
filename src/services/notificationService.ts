import { ORG_DETAILS } from '../data/organizationData';

const PRIMARY_EMAIL = ORG_DETAILS.email; // joymonirhatyouthorganaization@gmail.com
const ADMIN_EMAIL = 'nurealam.shanto.net@gmail.com';
const WHATSAPP_PHONE = `88${ORG_DETAILS.whatsapp}`; // 8801705929049

export interface VolunteerNotificationData {
  appId: string;
  fullName: string;
  mobile: string;
  email?: string;
  bloodGroup: string;
  village: string;
  occupation?: string;
  interests: string[];
  message?: string;
}

export interface BloodRequestData {
  patientName: string;
  bloodGroup: string;
  bagsCount: string;
  hospitalName: string;
  contactNumber: string;
  urgencyTime: string;
  notes?: string;
}

export interface GeneralContactData {
  senderName: string;
  senderContact: string;
  subject: string;
  message: string;
}

/**
 * Automatically triggers WhatsApp dispatch without extra user clicks
 */
function triggerWhatsAppDispatch(formattedText: string) {
  try {
    const encoded = encodeURIComponent(formattedText);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encoded}`;
    
    // Create and click an invisible synthetic link for maximum browser & iframe compatibility
    const link = document.createElement('a');
    link.href = whatsappUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      if (document.body.contains(link)) {
        document.body.removeChild(link);
      }
    }, 100);
  } catch (err) {
    console.warn('Automatic WhatsApp dispatch encountered an issue:', err);
  }
}

/**
 * Sends email payload to FormSubmit endpoints in parallel (both organization and admin emails)
 */
async function sendToEmailEndpoints(subject: string, fields: Record<string, string>): Promise<boolean> {
  const payload = {
    _subject: subject,
    _template: 'table',
    _captcha: 'false',
    _cc: `${ADMIN_EMAIL},${PRIMARY_EMAIL}`,
    ...fields
  };

  const endpoints = [
    `https://formsubmit.co/ajax/${PRIMARY_EMAIL}`,
    `https://formsubmit.co/ajax/${ADMIN_EMAIL}`
  ];

  try {
    const promises = endpoints.map((url) =>
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload),
        keepalive: true
      })
    );

    const results = await Promise.allSettled(promises);
    return results.some((r) => r.status === 'fulfilled' && (r.value as Response).ok);
  } catch (err) {
    console.error('Email dispatch error:', err);
    return false;
  }
}

/**
 * Sends Volunteer Application to Email and WhatsApp automatically
 */
export async function sendVolunteerNotification(data: VolunteerNotificationData): Promise<{ success: boolean; emailSent: boolean }> {
  // 1. Format WhatsApp text
  const waMessage = 
`🤝 *নতুন স্বেচ্ছাসেবক নিবন্ধন - জয়মনিরহাট ইউনিয়ন যুব সংগঠন*
----------------------------------------
🆔 নিবন্ধন আইডি: ${data.appId}
👤 পুরো নাম: ${data.fullName}
📞 মোবাইল: ${data.mobile}
🩸 রক্তের গ্রুপ: ${data.bloodGroup}
📍 এলাকা/ওয়ার্ড: ${data.village}
💼 পেশা/শিক্ষা: ${data.occupation || 'উল্লেখ নেই'}
📧 ইমেইল: ${data.email || 'উল্লেখ নেই'}
🎯 সেবার ক্ষেত্রসমূহ: ${data.interests.join(', ')}
💬 মতামত/বার্তা: ${data.message || 'স্বেচ্ছাসেবী হিসেবে যুক্ত হতে আগ্রহী'}
⏰ সময়: ${new Date().toLocaleString('bn-BD')}
----------------------------------------
(জয়মনিরহাট যুব সংগঠন ওয়েবসাইট থেকে স্বয়ংক্রিয়ভাবে প্রেরিত)`;

  // 2. Trigger WhatsApp dispatch immediately during submit
  triggerWhatsAppDispatch(waMessage);

  // 3. Send Email to both official and admin inboxes
  const emailSent = await sendToEmailEndpoints(
    `[JUYO স্বেচ্ছাসেবক আবেদন] ${data.fullName} (${data.bloodGroup}) - ${data.appId}`,
    {
      'আবেদন আইডি': data.appId,
      'নাম': data.fullName,
      'মোবাইল নম্বর': data.mobile,
      'ইমেইল': data.email || 'প্রযোজ্য নয়',
      'রক্তের গ্রুপ': data.bloodGroup,
      'ওয়ার্ড / গ্রাম': data.village,
      'পেশা': data.occupation || 'প্রযোজ্য নয়',
      'আগ্রহের ক্ষেত্র': data.interests.join(', '),
      'বার্তা বা মতামত': data.message || 'সংগঠনে যোগ দিতে ইচ্ছুক',
      'তারিখ ও সময়': new Date().toLocaleString('bn-BD')
    }
  );

  return { success: true, emailSent };
}

/**
 * Sends Urgent Blood Request to Email and WhatsApp automatically
 */
export async function sendBloodRequestNotification(data: BloodRequestData): Promise<{ success: boolean; emailSent: boolean }> {
  // 1. Format WhatsApp text
  const waMessage = 
`🚨 *জরুরি রক্তের আবেদন - জয়মনিরহাট ইউনিয়ন যুব সংগঠন*
----------------------------------------
🩸 প্রয়োজনীয় রক্তের গ্রুপ: *${data.bloodGroup}*
💉 রক্তের পরিমাণ: *${data.bagsCount} ব্যাগ*
👤 রোগীর নাম: ${data.patientName}
🏥 হাসপাতাল ও ঠিকানা: ${data.hospitalName}
📞 যোগাযোগের নম্বর: *${data.contactNumber}*
⏰ কখন প্রয়োজন / জরুরি সময়: *${data.urgencyTime}*
📝 রোগীর সমস্যা বা নোট: ${data.notes || 'জরুরি রক্তের চাহিদা'}
⏰ আবেদনের সময়: ${new Date().toLocaleString('bn-BD')}
----------------------------------------
(জয়মনিরহাট যুব সংগঠন রক্তদান স্কোয়াড)`;

  // 2. Trigger WhatsApp dispatch immediately
  triggerWhatsAppDispatch(waMessage);

  // 3. Send Email to both official and admin inboxes
  const emailSent = await sendToEmailEndpoints(
    `🚨 [জরুরি রক্তদান প্রয়োজন: ${data.bloodGroup}] রোগী: ${data.patientName} (${data.hospitalName})`,
    {
      'প্রয়োজনীয় রক্তের গ্রুপ': data.bloodGroup,
      'পরিমাণ': `${data.bagsCount} ব্যাগ`,
      'রোগীর নাম': data.patientName,
      'হাসপাতাল ও ঠিকানা': data.hospitalName,
      'যোগাযোগের নম্বর': data.contactNumber,
      'কখন প্রয়োজন': data.urgencyTime,
      'অতিরিক্ত বিবরণ': data.notes || 'জরুরি রক্তের চাহিদা',
      'আবেদনের সময়': new Date().toLocaleString('bn-BD')
    }
  );

  return { success: true, emailSent };
}

/**
 * Sends General Inquiry to Email and WhatsApp automatically
 */
export async function sendGeneralContactNotification(data: GeneralContactData): Promise<{ success: boolean; emailSent: boolean }> {
  const waMessage = 
`✉️ *সাধারণ বার্তা ও অনুসন্ধান - জয়মনিরহাট যুব সংগঠন*
----------------------------------------
👤 প্রেরকের নাম: ${data.senderName}
📞 মোবাইল / হোয়াটসঅ্যাপ: ${data.senderContact}
📌 বিষয়: ${data.subject}
💬 বিস্তারিত বার্তা:
${data.message}
----------------------------------------
⏰ সময়: ${new Date().toLocaleString('bn-BD')}`;

  triggerWhatsAppDispatch(waMessage);

  const emailSent = await sendToEmailEndpoints(
    `[JUYO অনুসন্ধান] ${data.subject} - ${data.senderName}`,
    {
      'প্রেরকের নাম': data.senderName,
      'মোবাইল নম্বর': data.senderContact,
      'বিষয়': data.subject,
      'বার্তা': data.message,
      'তারিখ ও সময়': new Date().toLocaleString('bn-BD')
    }
  );

  return { success: true, emailSent };
}
