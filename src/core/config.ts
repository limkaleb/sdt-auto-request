const timezoneMap = {
  Taipei: 'Asia/Taipei',
  HongKong: 'Asia/Hong_Kong',
  KualaLumpur: 'Asia/Kuala_Lumpur',
  Singapore: 'Asia/Singapore',
  NewYork: 'America/New_York',
  Jakarta: 'Asia/Jakarta',
  Tokyo: 'Asia/Tokyo',
  Seoul: 'Asia/Seoul',
  Amsterdam: 'Europe/Amsterdam',
  Bangkok: 'Asia/Bangkok',
  LosAngeles: 'America/Los_Angeles',
  Melbourne: 'Australia/Melbourne',
  Sydney: 'Australia/Sydney',
  Brisbane: 'Australia/Brisbane',
  Paris: 'Europe/Paris',
};

const sendEmailUrl = 'https://email-service.digitalenvision.com.au/send-email';

const sendEmailTarget = 'test@digitalenvision.com.au';

const config = {
  TIMEZONE_MAP: timezoneMap,
  SEND_EMAIL_URL: sendEmailUrl,
  SEND_EMAIL_TARGET: sendEmailTarget,
};

export default config;
