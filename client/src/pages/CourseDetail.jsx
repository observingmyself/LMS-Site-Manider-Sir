import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

function CourseDetail() {
  const [singleCourse, setSingleCourse] = useState({});
  const [enrolledStudent, setEnrolledStudent] = useState([]);
  const [purchased, setPurchased] = useState(false);
  const [ppts, setPpts] = useState([]);
  const [ebooks, setEbooks] = useState([]);
  const [isSyllabusOpen, setSyllabusOpen] = useState(false);
  const [isLectureNotesOpen, setLectureNotesOpen] = useState(false);
  const [isEbookOpen, setEbookOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const getSingleCourse = async () => {
    try {
      const data = await axios.get(`/api/v1/course/singlecourse/${id}`);
      if (data.data.success) {
        // console.log(data.data.data);
        setSingleCourse(data.data.data);
        setEnrolledStudent(data.data.data.enrolledStudent);
      }
    } catch (e) {
      console.log("err in getting single course", e);
    }
  };
  useEffect(() => {
    getSingleCourse();
  }, []);

  useEffect(() => {
    enrolledStudent.map((course) => {
      if (user?.enrolledCourse.includes(singleCourse?._id)) {
        setPurchased(true);
      } else {
        setPurchased(false);
      }
    });
  });

  // get ppts
  const getPpts = async () => {
    try {
      const data = await axios.get(`/api/v1/course/ppt/${id}`);
      if (data) {
        setPpts(data.data.data.ppt);
        // console.log(data)
      }
    } catch (e) {
      console.log(e);
    }
  };
  const getEbooks = async () => {
    try {
      const data = await axios.get(`/api/v1/course/Ebook/${id}`);
      if (data) {
        setEbooks(data.data.data.ebooks);
        // console.log(data)
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getPpts();
    getEbooks();
  }, [id]);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };
  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  }, []);

  const payPayment = async (courseId) => {
    try {
      if (isAuthenticated) {
        const res = await axios.post("/api/v1/payment/checkout", {
          courseId: courseId,
        });
        const data = res.data;
        // console.log(data);
        if (!data.success) {
          toast.error("Failed to create Razorpay order");
          return;
        }
        handlePaymentSuccess(data.data);
      } else {
        navigate("/login");
        toast.error("Login To Proceed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePaymentSuccess = async (response) => {
    console.log(response);
    const options = {
      key: "rzp_test_b9FyB1RcbK4rZq",
      order_id: response.id,
      ...response,
      handler: function (response) {
        // console.log(response);
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
          response;

        axios
          .post("/api/v1/payment/verifyPayment", {
            order_id: razorpay_order_id,
            payment_id: razorpay_payment_id,
            signature: razorpay_signature,
          })
          .then((res) => {
            if (res?.data.success) toast.success("Payment successfull");
            window.location.reload();
            // console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      },
    };
    const rzpay = new window.Razorpay(options);
    rzpay.open();
  };
  return (
    <div className="container mx-auto px-4 lg:px-20 py-12 mt-20">
      {/* Course Header */}
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${singleCourse.courseThumbnail})`,
        }}
        className="bg-no-repeat backdrop-blur-sm bg-cover bg-center text-white p-8 rounded-lg shadow-lg md:py-20"
      >
        <p className="sm:text-lg text-xl mb-2">
          <span className="font-bold">Category {">"}</span>{" "}
          {singleCourse.category}
        </p>
        <h1 className="text-4xl font-bold mb-4">{singleCourse.courseTitle}</h1>
        <p className="text-lg mb-4">{singleCourse.subTitle}</p>
        {purchased ? (
          <>
            <button
              disabled
              className="flex justify-center align-center gap-1 bg-green-500 text-gray-900 font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-green-400 transition duration-300"
            >
              Purchased <box-icon name="check"></box-icon>
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => payPayment(singleCourse._id)}
              className="bg-amber-300 text-gray-900 font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-yellow-400 transition duration-300"
            >
              Purchase Now - ₹ {singleCourse.coursePrice}
            </button>
          </>
        )}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
        {/* Left Column */}
        <div className="lg:col-span-2">
          {/* Course Description */}
          <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Course Description
            </h2>
            <p className="text-gray-600">{singleCourse.description}</p>
          </div>

          {/* Right Column on Mobile */}
          <div className="block lg:hidden bg-white p-6 rounded-lg shadow-lg mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Course Details
            </h3>
            <ul className="text-gray-600 space-y-2">
              <li>
                <strong>Instructor:</strong> {singleCourse.instructor}
              </li>
              <li>
                <strong>Duration:</strong> {singleCourse.courseDuration}
              </li>
              <li>
                <strong>Skill Level:</strong> {singleCourse.courseLevel}
              </li>
              <li>
                <strong>Language:</strong> {singleCourse.courseLanguage}
              </li>
              <li>
                <strong>Created At:</strong>{" "}
                {new Date(singleCourse.createdAt).toLocaleDateString()}
              </li>
              <li>
                <strong>Updated At:</strong>{" "}
                {new Date(singleCourse.updatedAt).toLocaleDateString()}
              </li>
            </ul>
          </div>

          {/* Download Section */}
          {!purchased ? (
            <>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Download Resources
                </h2>
                <ul className="space-y-4">
                  <li className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md">
                    <span className="font-semibold text-gray-800">
                      Course Syllabus
                    </span>
                    <button
                      disabled
                      className="bg-gray-300 text-gray-600 py-2 px-4 rounded-lg flex items-center justify-center space-x-2 cursor-not-allowed"
                    >
                      <box-icon name="lock-alt" color="gray"></box-icon>
                      <span className="ml-2">Locked</span>
                    </button>
                  </li>
                  <li className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md">
                    <span className="font-semibold text-gray-800">
                      Lecture Notes (PDF)
                    </span>
                    <button
                      disabled
                      className="bg-gray-300 text-gray-600 py-2 px-4 rounded-lg flex items-center justify-center space-x-2 cursor-not-allowed"
                    >
                      <box-icon name="lock-alt" color="gray"></box-icon>
                      <span className="ml-2">Locked</span>
                    </button>
                  </li>
                  <li className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md">
                    <span className="font-semibold text-gray-800">eBook</span>
                    <button
                      disabled
                      className="bg-gray-300 text-gray-600 py-2 px-4 rounded-lg flex items-center justify-center space-x-2 cursor-not-allowed"
                    >
                      <box-icon name="lock-alt" color="gray"></box-icon>
                      <span className="ml-2">Locked</span>
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-4">
                <div
                  className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md cursor-pointer"
                  onClick={() => setSyllabusOpen(!isSyllabusOpen)}
                >
                  <span className="font-semibold text-gray-800">
                    Course Syllabus
                  </span>
                  <span>{isSyllabusOpen ? "-" : "+"}</span>
                </div>
                {isSyllabusOpen && (
                  <ul className="space-y-2 mt-2 pl-6">
                    {singleCourse.syllabus.map((sy) => (
                      <li
                        key={sy._id}
                        className="flex items-center justify-between bg-gray-200 p-2 rounded-lg"
                      >
                        <span className="text-gray-800">{sy.fileName}</span>
                        <a
                          href={sy.fileUrl}
                          className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600 transition duration-300"
                          download
                        >
                          Download
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Lecture Notes Dropdown */}
              <div className="space-y-4 mt-4">
                <div
                  className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md cursor-pointer"
                  onClick={() => setLectureNotesOpen(!isLectureNotesOpen)}
                >
                  <span className="font-semibold text-gray-800">
                    Lecture Notes (PDF)
                  </span>
                  <span>{isLectureNotesOpen ? "-" : "+"}</span>
                </div>
                {isLectureNotesOpen && (
                  <ul className="space-y-2 mt-2 pl-6">
                    {ebooks?.map((ebook) => (
                      <li
                        key={ebook._id}
                        className="flex items-center justify-between bg-gray-200 p-2 rounded-lg"
                      >
                        <span className="text-gray-800">{ebook.title}</span>
                        <a
                          href={ebook.ebookUrl}
                          className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600 transition duration-300"
                          download
                        >
                          Download
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* eBook Dropdown */}
              <div className="space-y-4 mt-4">
                <div
                  className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md cursor-pointer"
                  onClick={() => setEbookOpen(!isEbookOpen)}
                >
                  <span className="font-semibold text-gray-800">eBook</span>
                  <span>{isEbookOpen ? "-" : "+"}</span>
                </div>
                {isEbookOpen && (
                  <ul className="space-y-2 mt-2 pl-6">
                    {ppts?.map((ppt) => (
                      <li
                        key={ppt._id}
                        className="flex items-center justify-between bg-gray-200 p-2 rounded-lg"
                      >
                        <span className="text-gray-800">{ppt.title}</span>
                        <a
                          href={ppt.pptUrl}
                          className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600 transition duration-300"
                          download
                        >
                          Download
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </>
          )}
        </div>

        {/* Right Column on Larger Screens */}
        <div className="hidden lg:block">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Course Details
            </h3>
            <ul className="text-gray-600 space-y-2">
              <li>
                <strong>Instructor:</strong> {singleCourse.instructor}
              </li>
              <li>
                <strong>Duration:</strong> {singleCourse.courseDuration}
              </li>
              <li>
                <strong>Skill Level:</strong> {singleCourse.courseLevel}
              </li>
              <li>
                <strong>Language:</strong> {singleCourse.courseLanguage}
              </li>
              <li>
                <strong>Created At:</strong>{" "}
                {new Date(singleCourse.createdAt).toLocaleDateString()}
              </li>
              <li>
                <strong>Updated At:</strong>{" "}
                {new Date(singleCourse.updatedAt).toLocaleDateString()}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
