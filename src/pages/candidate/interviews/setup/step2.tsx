import { FC, useState } from "react";
import { JobSetupData } from "./setup";
import { usePostStartInterviewMutation } from "../../../../features/interviews/api/interview.api";

const SetUpStep2: FC<{ data: JobSetupData }> = ({ data }) => {
  const [speechRate, setSpeechRate] = useState(40);
  const [numQuestion, setNumQuestion] = useState(12);
  const [skipIntro, setSkipIntro] = useState(false);
  const [skipCode, setSkipCode] = useState(false);
  const [language, setLanguage] = useState<string>("English");

  const [postStartInterview] = usePostStartInterviewMutation();

  const handleStartInterview = async () => {
    const interviewData = {
      position: data.position,
      experience: data.experience,
      language: language as string,
      models: "en-GB-RyanNeural",
      speed: speechRate,
      skills: [data?.skills],
      maxQuestions: numQuestion,
      skipIntro,
      skipCode,
    };

    try {
      const response = await postStartInterview(interviewData).unwrap();
      console.log("interview data", interviewData);
      console.log("Interview started: ", response);
    } catch (err) {
      console.error("Error starting interview: ", err);
    }
  };

  return (
    <>
      <div className="fotn-back text-[48px] font-arya w-full text-center mt-6">
        Interview Context & Models
      </div>
      <div className="text-[24px] text-gray-800 w-full text-center mb-8">
        Then, choose AI interviewer & set up informations for the interview
        session.
      </div>
      <div className="flex w-full">
        <div className="w-7/12">
          <div className="mb-10 text-[var(--primary-color)] ">
            <div className="font-medium mb-1 text-xl w-full">Position</div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="py-2 pe-12 ps-2  shadow rounded-md focus:outline-none focus:ring focus:ring-teal-300"
            >
              <option value="English">English</option>
              <option value="VietNamese">VietNamese</option>
            </select>
            <div>Models (English)</div>
            <div className="grid grid-cols-2 grid-rows-2 gap-4">
              <div className="size-[200px] rounded-lg bg-gray-300" />
              <div className="size-[200px] rounded-lg bg-gray-300" />
              <div className="size-[200px] rounded-lg bg-gray-300" />
              <div className="size-[200px] rounded-lg bg-gray-300" />
            </div>
          </div>
        </div>
        <div className="w-5/12 text-xl text-primary font-semibold">
          <div>Speech rate</div>
          <input
            type="range"
            min="0"
            max="100"
            value={speechRate}
            onChange={(e) => setSpeechRate(Number(e.target.value))}
            className="range  [--range-thumb:white] text-primary "
          />
          <div>Number of questions</div>

          <input
            type="range"
            min="8"
            max="16"
            value={numQuestion}
            onChange={(e) => setNumQuestion(Number(e.target.value))}
            className="range  [--range-thumb:white] text-primary "
          />
          <div className="flex justify-between">
            <span> Skip intro question</span>
            <input
              type="checkbox"
              checked={skipIntro}
              onChange={(e) => setSkipIntro(e.target.checked)}
              className="checkbox   checked:bg-primary checked:text-white size-8"
            />
          </div>
          <div className="flex justify-between">
            <div className="w-3/5">
              <div> Skip coding question</div>
              <div className="text-[12px] font-medium">
                (If you choose not to skip, the last question would be a coding
                problem)
              </div>
            </div>
            <input
              type="checkbox"
              checked={skipCode}
              onChange={(e) => setSkipCode(e.target.checked)}
              className="checkbox   checked:bg-primary checked:text-white size-8"
            />
          </div>
        </div>
      </div>

      <div
        onClick={() => handleStartInterview()}
        className="mt-24 bg-primary text-center text-white px-24 py-1.5 rounded-lg"
      >
        Start
      </div>
    </>
  );
};
export default SetUpStep2;
