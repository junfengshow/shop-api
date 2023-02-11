const Controller = require('egg').Controller

class UploadConfig extends Controller {
	async qiniuConfig () {
		const { ctx } = this
		
		const _res = {}
		try {
			const qiniu = require('qiniu')
			var accessKey = 'TLBnZV7GSiKDJNdPnUewy5pEKU63GstP-tsVo28D';
			var secretKey = 'VkYUra1mpCQb0gP_RLa2Nbjko4DXIYAJ-na0FoHg';
			var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

			var options = {
			  scope: 'wujunfengmain',
			  expires: 7200
			};
			var putPolicy = new qiniu.rs.PutPolicy(options);
			var uploadToken = putPolicy.uploadToken(mac);

			const crypto = require('crypto')
			const strlen = 32
			const noceStr = crypto.randomBytes(Math.ceil(strlen / 2)).toString('hex').slice(0, strlen)

			_res.result = 0
			_res.msg = 'ok'
			_res.data = {
				qiniuTocken: uploadToken,
				prefix: noceStr,
				url: '//upload.junfengshow.com'
			}
		} catch (e) {
			ctx.logger.error(e)
			_res.msg = '服务器出小差'
			_res.result = 1
			_res.data = null
		}
		ctx.body = _res
	}
}
module.exports = UploadConfig
