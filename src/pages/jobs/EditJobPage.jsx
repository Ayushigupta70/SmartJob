import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs, updateJob } from "../../slice/JobSlice";
import PostJobPage from "./PostJobPage";

const EditJobPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { jobs2, loading } = useSelector((state) => state.jobs);

  const [job, setJob] = useState(null);

  useEffect(() => {
    if (!jobs2 || jobs2.length === 0) {
      dispatch(fetchJobs());
    }
  }, [dispatch, jobs2]);

  useEffect(() => {
  if (jobs2 && jobs2.length > 0) {
    const existingJob = jobs2.find((j) => j._id === id || j.id === id);
    if (existingJob) {
      // ✅ Format dates for input[type="date"]
      const formattedJob = {
        ...existingJob,
        postingDate: existingJob.postingDate
          ? new Date(existingJob.postingDate).toISOString().split("T")[0]
          : "",
        applicationDeadline: existingJob.applicationDeadline
          ? new Date(existingJob.applicationDeadline).toISOString().split("T")[0]
          : "",
      };
      setJob(formattedJob);
    } else {
      navigate("/jobs/manage");
    }
  }
}, [jobs2, id, navigate]);


  const handleUpdate = (updatedJob) => {
    dispatch(updateJob({ ...updatedJob, _id: id }))
      .unwrap()
      .then(() => {
        navigate("/jobs/manage");
      })
      .catch((err) => {
        console.error("Update failed:", err);
      });
  };

  if (loading) return <p>Loading...</p>;
  if (!job) return null;

  return (
    <PostJobPage editMode={true} existingJob={job} onUpdate={handleUpdate} />
  );
};

export default EditJobPage;
