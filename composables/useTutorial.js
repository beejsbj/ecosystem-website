export default async function useTutorial(data) {
  const route = useRoute();

  const currentTutorial = computed(() => route.params.detail);
  const currentStep = computed(() => route.params.step);
  const currentStepNum = computed(() =>
    Number(currentStep.value.split("-")[1])
  );

  const steps = await queryContent("tutorials/" + route.params.detail).find();

  const stepsCount = computed(() => steps.length - 1);

  const hasPreviousStep = computed(() => currentStepNum.value > 0);
  const hasNextStep = computed(() => currentStepNum.value < stepsCount.value);

  //

  function changeStep(step) {
    return `step-${currentStepNum.value + step}`;
  }

  return {
    currentTutorial,
    currentStep,
    currentStepNum,
    steps,
    stepsCount,
    hasPreviousStep,
    hasNextStep,
    changeStep,
  };
}
