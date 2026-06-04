export function Stats({ plan = 'free', completedCourses = 0, aiMessages = 0 } = {}) {
  return `<section class="stats"><article><strong>${plan}</strong><span>Plan actuel</span></article><article><strong>${completedCourses}</strong><span>Modules terminés</span></article><article><strong>${aiMessages}</strong><span>Messages IA</span></article></section>`;
}
