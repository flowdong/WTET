import { registerAs } from '@nestjs/config';

export default registerAs('app_global', () => ({
  port: process.env.APP_PROT,
  upload_prefix: process.env.UPLOAD_URL_PRE,
  upload_url_dir: process.env.UPLOAD_URL_DIR,
}));
