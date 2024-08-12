import sdk from "@stackblitz/sdk";
import { parseMarkdown } from "@/utils/parseMarkdown";

export default async function useTutorial() {
  const route = useRoute();

  // stackblitz
  const vm = ref(null);

  // computed ///////////////////////////////////////////
  const currentTutorial = computed(() => route.params.detail);
  const currentStep = computed(() => Number(route.query.step ?? 0)); //?step=1

  // the path to the current step in the tutorial
  const stepPath = computed(() => {
    return `${currentTutorial.value}/step-${currentStep.value}`;
  });

  // the path to the github repo for the stacblitz embed
  const repoPath = computed(
    () => `api3-ecosystem/interactive-guides/tree/main/${stepPath.value}`
  );

  // fetch the steps for the current tutorial
  const { data: stepsData } = await useFetch(
    `/api/guides/guide/${currentTutorial.value}`
  );

  const steps = computed(() => stepsData.value.steps);

  const currentStepData = computed(() => steps.value[currentStep.value]);

  // the path to the markdown file for the current step in the tutorial
  const markdownFetchPath = computed(() => currentStepData.value.markdown);
  const configFetchPath = computed(() => currentStepData.value.config);

  // the total number of steps in the tutorial
  const stepsCount = computed(() => steps.value.length - 1);

  // check if there is a previous or next step
  const hasPreviousStep = computed(() => currentStep.value > 0);
  const hasNextStep = computed(() => currentStep.value < stepsCount.value);

  // fetch the markdown content for the current step and parse it
  const { data: markdown } = await useLazyFetch(() => markdownFetchPath.value, {
    watch: [markdownFetchPath],
  });

  // fetch the config content for the current step and parse it
  const { data: config } = await useLazyFetch(() => configFetchPath.value, {
    watch: [configFetchPath],
  });

  const parsedMarkdown = ref(await parseMarkdown({ content: markdown.value }));

  // editor options
  const editorOptions = computed(() => {
    const json = JSON.parse(config.value);

    if (!json) {
      return {
        height: "100%",
        openFile: ["credentials.json:L5-L8", "package.json:L1-L3"],
        view: "editor",
      };
    }

    json.height = "100%";

    return json;
  });

  console.log("config", editorOptions.value);

  //functions
  function changeStep(step) {
    const url = `?step=${currentStep.value + step}`;
    navigateTo(url);
  }

  async function initTutorial() {
    // if the current step is 0, don't embed the stackblitz
    if (!currentStep.value) {
      return;
    }

    vm.value = sdk.embedGithubProject(
      "stackblitz",
      repoPath.value,
      editorOptions.value
    );
  }

  watch(currentStep, initTutorial);

  watch(markdown, async () => {
    parsedMarkdown.value = await parseMarkdown({ content: markdown.value });
  });

  return {
    currentTutorial,
    currentStep,
    steps,
    stepsCount,
    stepPath,
    parsedMarkdown,
    hasPreviousStep,
    hasNextStep,
    changeStep,
    initTutorial,
  };
}
