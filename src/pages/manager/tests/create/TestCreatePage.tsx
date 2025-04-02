import { useEffect, useMemo, useState } from "react";
import { usePostTestsMutation } from "../../../../features/tests/api/test.api-gen";
import { useNavigate } from "react-router-dom";
import TestCreateStepper from "./Steps/TestCreateStepper";
import TestCreateStep1 from "./Steps/TestCreateStep1";
import TestCreateStep2 from "./Steps/TestCreateStep2";
import TestCreateStep3 from "./Steps/TestCreateStep3";
import TestCreateStep4 from "./Steps/TestCreateStep4";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { testPersistActions, testPersistSelectors } from "../../../../features/tests/stores/testPersistSlice";
import paths from "../../../../router/paths";

const TestCreateQuestion = () => {
	const navigate = useNavigate();
	const [step, setStep] = useState(0);
	const dispatch = useAppDispatch();

	const {
		loadCreate,
	} = testPersistActions;
	const {
		selectCreateTestApiArg: selectCreateTestParam
	} = testPersistSelectors;
	useEffect(() => {
		dispatch(loadCreate());
	}, []);

	const getStepComponent = useMemo(() => {
		switch (step) {
			case 0:
				return <TestCreateStep1 onNext={() => setStep(1)} />;
			case 1:
				return <TestCreateStep2 onNext={() => setStep(2)} />;
			case 2:
				return <TestCreateStep3 onNext={() => setStep(3)} />;
			case 3:
				return <TestCreateStep4
					isLoading={isLoading}
					onNext={handleCreateTest}
				/>;
			default:
				return null;
		}
	}, [step]);

	const [createTest, { isSuccess, isLoading }] = usePostTestsMutation();
	useEffect(() => {
		if (isSuccess) {
			navigate(paths.manager.tests.SELF);
		}
	}, [isSuccess, navigate]);


	const handleCreateTest = () => {
		const testCreateParam = useAppSelector(selectCreateTestParam);
		if (testCreateParam == null) {
			// TODO: show snackbar error
			return;
		}
		createTest(testCreateParam);
	};


	return (
		<div className="relative flex flex-col items-center justify-center w-full h-screen bg-[var(--background-color)]">
			<TestCreateStepper
				step={step}
				onStepChange={(step) => setStep(step)}
			/>

			<div>
				{getStepComponent}
			</div>

			<div className="absolute top-10 right-10">
				<img className="w-4" src="https://cdn-icons-png.flaticon.com/512/566/566013.png" alt="" />
			</div>
		</div>
	);
}

export default TestCreateQuestion;