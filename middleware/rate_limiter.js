const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
	windowMs:   60 * 1000, // 1 minutes
	max: 5, // Limit each IP to 5 requests per `window` (here, per 15 minutes)
	message:"Max Request Limit Has Been Exceeded"
})

module.exports={
    limiter
}