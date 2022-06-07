const express = require("express");
const router = express.Router();
const {
	PostJobs,
	EditJob,
	getSingleJob,
	GetAllJobs,
	DeleteJob,
	queryData,
} = require("../Controller/JobController");

router.post("/:id/jobposting", PostJobs);
router.patch("/:id/:id/jobedit", EditJob);
router.get("/myjobs/jobs", queryData);
router.get("/:id/:id/singlejob", getSingleJob);
router.delete("/:id/:id/removejob", DeleteJob);
router.get("/alljobs", GetAllJobs);

module.exports = router;
