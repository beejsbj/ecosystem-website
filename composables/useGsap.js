export default function useGsap(animationFunction) {
  // auto imported by nuxt
  const { $gsap } = useNuxtApp();

  // Ensure the animation function is called within the GSAP context
  // This context will automatically collect all animations created within it

  let context;

  onMounted(() => {
    context = $gsap[0].context(() => {
      // Provide gsap and ScrollTrigger to the animation function
      if (animationFunction) animationFunction(...Object.values($gsap));
    });
  });

  // Automatically clean up when the component using this composable is unmounted

  onUnmounted(() => {
    // Kills all animations in the context, reverting their properties to the initial states
    //  console.log("killing animation");
    context.kill();
  });

  return {
    ...$gsap,
  };
}
