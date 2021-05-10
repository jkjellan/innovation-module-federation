const router = require("express").Router();
const axios = require("axios");
var connections = new Map();

let axiosConfig = {
	headers: {
		"Content-Type": "application/json;charset=UTF-8"
	}
};

let axiosTimeoutConfig = {
	headers: {
		"Content-Type": "application/json;charset=UTF-8",
	},
	timeout: 2000
};

const isProd = () => {
	return process.env.ETS_DEPLOY_ENV === "production";
};

const troveUrl = () => {
	return isProd()
		? "https://trove-production.prod.uscm.libertyec.com"
		: "https://trove-test.np.uscm.libertyec.com";
		//: "http://localhost:8083";
};

/** * ========== Middleware ========== ** */
router.use((req, res, next) => {
	// sse setup
	res.sseSetup = function() {
		res.writeHead(200, {
			"Content-Type": "text/event-stream",
			"Cache-Control": "no-cache",
			Connection: "keep-alive"
		});
	};

	res.sseSend = function(event, data) {
		res.write("event: " + event + "\n");
		res.write("data: " + JSON.stringify(data) + "\n\n");
	};

	// continue onto the routes path
	next();
});

/** * ===== Service API Endpoints ===== ** */
router.get("/health", (req, res) => {
	res.json({ description: "API Health", status: "UP" })
});

router.post("/logEduIdSessionId", (req, res) => {
	// console.log("logEduIdSessionId req: ", req.body)
	axios
		.post(troveUrl() + "/eduIdSessionIdMapping", req.body, axiosConfig)
		.then(response => {
			console.log("/logEduIdSessionId response: ", response.data)
			res.send(response.data);
		})
		.catch(error => {
			logError("logEduIdSessionId error: ", error, req.body);
			if (error.response) {
				res.sendStatus(error.response.status);
			} else {
				res.sendStatus(500);
			}
		});
});

router.get('/userAuth', (req, res) =>{
	// we don't want browser to cache auth response
	res.header("Cache-Control", "no-cache, no-store, must-revalidate");
	res.header("Pragma", "no-cache");
	res.header("Expires", 0);
	
	res.send(req.session.passport.user);
});

router.post("/interact", (req, res) => {
	axios
		.post(troveUrl() + "/interact", req.body, axiosConfig)
		.then(response => {
			//console.log("interact response.data: ", response.data)
			res.send(response.data);
		})
		.catch(error => {
			logError("interact error: ", error, req.body);
			if (error.response) {
				res.sendStatus(error.response.status);
			} else {
				res.sendStatus(500);
			}
		});
});

router.post("/interact/logDisposition", (req, res) => {
	axios
		.post(troveUrl() + "/interact/logDisposition", req.body, axiosConfig)
		.then(response => {
			//console.log("interact/logDisposition response.data: ", response.data)
			res.send(response.data);
		})
		.catch(error => {
			logError("interact/logDisposition error: ", error, req.body);
			if (error.response) {
				res.sendStatus(error.response.status);
			} else {
				res.sendStatus(500);
			}
		});
});

router.post("/offers", (req, res) => {
	axios
		.post(troveUrl() + "/offers", req.body, axiosConfig)
		.then(response => {
			res.send(response.data);
		})
		.catch(error => {
			logError("Offers error:", error, req.body);
			if (error.response) {
				res.sendStatus(error.response.status);
			} else {
				res.sendStatus(500);
			}
		});
});

router.post("/offers/dispositions/:brand", (req, res) => {
	axios
		.post(troveUrl()+"/offers/dispositions/"+req.params.brand, req.body, axiosConfig)
		.then(response => {
			res.send(response.data);
		})
		.catch(error => {
			logError("offers/dispositions/"+req.params.brand+" error: ", error, req.body);
			if (error.response) {
				res.sendStatus(error.response.status);
			} else {
				res.sendStatus(500);
			}
		});
});

/** * ===== SSE Endoint and setup ===== ** *//*
router.get("/events/:userId", (req, res) => {
	console.log("event stream opened");
	if (req.params.userId) {
		res.sseSetup();
		connections.set(req.params.userId, res);
		console.log(connections.size);
	}
});

// to do make a promise
const sendEvent = (userId, event, data) => {
	console.log("sending event, connections:" + connections.size);
	if (connections.has(userId)) connections.get(userId).sseSend(event, data);
};


var kafka = require("kafka-node"),
	Consumer = kafka.Consumer,
	Producer = kafka.Producer,
	client = new kafka.KafkaClient(),
	consumer = new Consumer(client, [{ topic: "n0266918", partition: 0 }], {
		groupId: "contact-center-1",
		autoCommit: false
	}),
	producer = new Producer(client);

consumer.on('message', function(message) {
	console.log(message);
	consumer.commit(function(err, data) {
		if (err) console.log(err);
		var val = JSON.parse(message.value);
		if (val.event === "offers") {
			axios.post(troveUrl(), val, axiosConfig).then(response => {
				console.log(response.data);
				sendEvent(message.topic, val.event, response.data);
				producer.send(
					[
						{
							topic: "n0266918",
							messages:
								'{"offerCount": ' +
								response.data.rankedOffers.length +
								', "event": "troveOffers"}',
							partition: 0
						}
					],
					function(err, data) {
						if(err)
							console.log(err);
						console.log(data);
					}
				);
			});
		}
	});
});

consumer.on("error", (err) => console.log("Kafka error", err));
consumer.on("offsetOutOfRange", (err) => console.log("Kafka error", err));
*/

const logError = (title, error, body) => {	
	console.log(title + (error.response ? ` Request rejected with status ${error.response.status}. ${error.response.statusText}: ` : "") + JSON.stringify(body));
	
	error.request = null;
	error.response = null;
	console.log(error);
};

module.exports = router;
