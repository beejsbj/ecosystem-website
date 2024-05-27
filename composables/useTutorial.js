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
    // if no step is provided, return the tutorial path for the Introduction
    if (!currentStep.value) {
      return `${currentTutorial.value}`;
    }

    return `${currentTutorial.value}/step-${currentStep.value}`;
  });

  // the path to the github repo for the stacblitz embed
  const repoPath = computed(
    () => `api3-ecosystem/interactive-guides/tree/main/${stepPath.value}`
  );

  // the path to the markdown file for the current step in the tutorial
  const markdownFetchPath = computed(() => {
    return `https://raw.githubusercontent.com/api3-ecosystem/interactive-guides/main/${stepPath.value}/readme.md`;
  });

  // fetch the steps for the current tutorial
  const { data: steps } = await useFetch(
    `https://api.github.com/repos/api3-ecosystem/interactive-guides/contents/${currentTutorial.value}`
  );

  // the total number of steps in the tutorial
  const stepsCount = computed(() => steps.value.length - 1);

  // check if there is a previous or next step
  const hasPreviousStep = computed(() => currentStep.value > 0);
  const hasNextStep = computed(() => currentStep.value < stepsCount.value);

  //
  //
  // fetch the markdown content for the current step and parse it
  const { data: markdown } = await useLazyFetch(() => markdownFetchPath.value, {
    watch: [markdownFetchPath],
  });

  const parsedMarkdown = ref(await parseMarkdown({ content: markdown.value }));

  // editor options
  const editorOptions = {
    height: "100%",
  };

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

    vm.value = sdk.embedGithubProject("stackblitz", repoPath.value, {
      openFile: "index.js",
      height: "100%",
    });
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
