// Categories Data
const categories = [
  { id: "body-metrics", name: "Body Metrics", icon: "" },
  { id: "calories-energy", name: "Calories & Energy", icon: "" },
  { id: "nutrition-macros", name: "Nutrition & Macros", icon: "" },
  { id: "hydration", name: "Hydration", icon: "" },
  { id: "strength-lifting", name: "Strength & Lifting", icon: "" },
  { id: "cardio-running", name: "Cardio & Running", icon: "" },
  { id: "sleep-recovery", name: "Sleep & Recovery", icon: "" },
  { id: "womens-health", name: "Women's Health", icon: "" },
  { id: "age-growth", name: "Age & Growth", icon: "" },
  { id: "supplements-health", name: "Supplements & Health", icon: "" },
  { id: "wellness-lifestyle", name: "Wellness & Lifestyle", icon: "" },
  { id: "cooking-kitchen", name: "Cooking & Kitchen", icon: "" },
  { id: "food-nutrition-diet", name: "Food Nutrition & Diet", icon: "" },
  { id: "meal-planning-grocery", name: "Meal Planning & Grocery", icon: "" }
];

const calculators = [
  { name: "BMI Calculator", slug: "bmi-calculator", description: "Calculate your Body Mass Index to evaluate your weight category.", categoryId: "body-metrics" },
  { name: "Body Fat Percentage", slug: "body-fat-percentage", description: "Estimate your body fat percentage using standard body measurements.", categoryId: "body-metrics" },
  { name: "Lean Body Mass", slug: "lean-body-mass", description: "Calculate your total body weight minus fat tissue.", categoryId: "body-metrics" },
  { name: "Waist-to-Hip Ratio", slug: "waist-to-hip-ratio", description: "Determine health risk based on your fat distribution pattern.", categoryId: "body-metrics" },
  { name: "Waist-to-Height Ratio", slug: "waist-to-height-ratio", description: "A quick screening tool for assessing cardiovascular risk.", categoryId: "body-metrics" },
  { name: "Ideal Body Weight", slug: "ideal-body-weight", description: "Find your ideal weight based on height and biological sex.", categoryId: "body-metrics" },
  { name: "Body Surface Area", slug: "body-surface-area", description: "Calculate your total body surface area for clinical use.", categoryId: "body-metrics" },
  { name: "Neck Circumference", slug: "neck-circumference", description: "Assess sleep apnea and cardiovascular risk via neck size.", categoryId: "body-metrics" },
  { name: "Wrist Size & Frame Size", slug: "wrist-size-frame-size", description: "Determine your body frame size using wrist measurements.", categoryId: "body-metrics" },
  { name: "Skeletal Muscle Mass", slug: "skeletal-muscle-mass", description: "Estimate the amount of skeletal muscle in your body.", categoryId: "body-metrics" },
  { name: "Visceral Fat Level", slug: "visceral-fat-level", description: "Gauge dangerous hidden fat surrounding your internal organs.", categoryId: "body-metrics" },
  { name: "Body Shape Index (ABSI)", slug: "body-shape-index", description: "Calculate ABSI for a refined mortality risk estimation.", categoryId: "body-metrics" },
  { name: "Ponderal Index", slug: "ponderal-index", description: "A measure of leanness similar to BMI, often used for infants.", categoryId: "body-metrics" },
  { name: "Body Roundness Index", slug: "body-roundness-index", description: "Quantify body shape and visceral fat accumulation.", categoryId: "body-metrics" },
  { name: "Fat-Free Mass Index", slug: "fat-free-mass-index", description: "Evaluate your muscularity relative to your height.", categoryId: "body-metrics" },
  { name: "TDEE Calculator", slug: "tdee-calculator", description: "Find out your Total Daily Energy Expenditure.", categoryId: "calories-energy" },
  { name: "BMR Mifflin-St Jeor", slug: "bmr-mifflin-st-jeor", description: "Calculate BMR using the highly accurate Mifflin-St Jeor equation.", categoryId: "calories-energy" },
  { name: "BMR Harris-Benedict", slug: "bmr-harris-benedict", description: "Estimate your resting calorie burn with the classic formula.", categoryId: "calories-energy" },
  { name: "BMR Katch-McArdle", slug: "bmr-katch-mcardle", description: "Determine BMR based on your lean body mass.", categoryId: "calories-energy" },
  { name: "Calorie Deficit Calculator", slug: "calorie-deficit-calculator", description: "Plan your calorie deficit for sustainable weight loss.", categoryId: "calories-energy" },
  { name: "Calorie Surplus Calculator", slug: "calorie-surplus-calculator", description: "Find the optimal surplus for muscle gain and bulking.", categoryId: "calories-energy" },
  { name: "Weight Loss Calorie Target", slug: "weight-loss-calorie-target", description: "Set daily goals to hit your target weight.", categoryId: "calories-energy" },
  { name: "Weight Gain Calorie Target", slug: "weight-gain-calorie-target", description: "Determine how many calories you need to gain weight.", categoryId: "calories-energy" },
  { name: "Calories Burned Walking", slug: "calories-burned-walking", description: "Calculate energy expended during your walks.", categoryId: "calories-energy" },
  { name: "Calories Burned Running", slug: "calories-burned-running", description: "Estimate calorie burn based on your running pace and time.", categoryId: "calories-energy" },
  { name: "Calories Burned Cycling", slug: "calories-burned-cycling", description: "Find out how much you burn on the bike.", categoryId: "calories-energy" },
  { name: "Calories Burned Swimming", slug: "calories-burned-swimming", description: "Determine calories burned through different swimming strokes.", categoryId: "calories-energy" },
  { name: "Calories Burned by Activity", slug: "calories-burned-activity", description: "Look up energy expenditure for hundreds of activities.", categoryId: "calories-energy" },
  { name: "Metabolic Age Estimator", slug: "metabolic-age-calculator", description: "Compare your BMR to the average for your age group.", categoryId: "calories-energy" },
  { name: "RMR Resting Metabolic Rate", slug: "rmr-calculator", description: "Calculate calories burned while completely at rest.", categoryId: "calories-energy" },
  { name: "Macro Calculator", slug: "macro-calculator", description: "Find your ideal breakdown of protein, carbs, and fat.", categoryId: "nutrition-macros" },
  { name: "Protein Intake Calculator", slug: "protein-intake-calculator", description: "Determine your daily protein needs based on goals.", categoryId: "nutrition-macros" },
  { name: "Carbohydrate Intake Calculator", slug: "carbohydrate-intake-calculator", description: "Calculate optimal carb intake for energy and recovery.", categoryId: "nutrition-macros" },
  { name: "Fat Intake Calculator", slug: "fat-intake-calculator", description: "Find your daily dietary fat requirements.", categoryId: "nutrition-macros" },
  { name: "Fiber Intake Calculator", slug: "fiber-intake-calculator", description: "Ensure you're getting enough fiber for digestive health.", categoryId: "nutrition-macros" },
  { name: "Sugar Intake Limit", slug: "sugar-intake-limit", description: "Determine your maximum recommended daily added sugar.", categoryId: "nutrition-macros" },
  { name: "Sodium Intake Calculator", slug: "sodium-intake-calculator", description: "Check your daily salt limits for optimal blood pressure.", categoryId: "nutrition-macros" },
  { name: "Cholesterol Intake Guide", slug: "cholesterol-intake-guide", description: "Assess your recommended daily dietary cholesterol.", categoryId: "nutrition-macros" },
  { name: "Vitamin D Needs Calculator", slug: "vitamin-d-needs-calculator", description: "Estimate your daily Vitamin D requirements.", categoryId: "nutrition-macros" },
  { name: "Iron Intake Calculator", slug: "iron-intake-calculator", description: "Find out how much iron you need based on age and gender.", categoryId: "nutrition-macros" },
  { name: "Calcium Needs Calculator", slug: "calcium-needs-calculator", description: "Calculate your daily calcium requirements for bone health.", categoryId: "nutrition-macros" },
  { name: "Omega-3 Needs Calculator", slug: "omega-3-needs-calculator", description: "Determine your required daily EPA and DHA intake.", categoryId: "nutrition-macros" },
  { name: "Calorie Density Calculator", slug: "calorie-density-calculator", description: "Evaluate foods based on calories per gram or volume.", categoryId: "nutrition-macros" },
  { name: "Meal Prep Portion Calculator", slug: "meal-prep-portion-calculator", description: "Easily scale ingredients for your weekly meal prep.", categoryId: "nutrition-macros" },
  { name: "Food Exchange Calculator", slug: "food-exchange-calculator", description: "Swap ingredients while maintaining similar nutritional profiles.", categoryId: "nutrition-macros" },
  { name: "Daily Water Intake Calculator", slug: "daily-water-intake", description: "Determine your baseline daily hydration needs.", categoryId: "hydration" },
  { name: "Water Intake by Body Weight", slug: "water-intake-body-weight", description: "Calculate hydration targets tailored to your mass.", categoryId: "hydration" },
  { name: "Hydration for Exercise", slug: "hydration-for-exercise", description: "Plan pre, during, and post-workout fluid intake.", categoryId: "hydration" },
  { name: "Electrolyte Needs Calculator", slug: "electrolyte-needs-calculator", description: "Estimate sodium, potassium, and magnesium requirements.", categoryId: "hydration" },
  { name: "Sweat Rate Calculator", slug: "sweat-rate-calculator", description: "Measure fluid loss during intense activities to guide replacement.", categoryId: "hydration" },
  { name: "One Rep Max — Epley Formula", slug: "one-rep-max-epley", description: "Estimate your 1RM using the popular Epley equation.", categoryId: "strength-lifting" },
  { name: "One Rep Max — Brzycki Formula", slug: "one-rep-max-brzycki", description: "Calculate 1RM with the widely used Brzycki formula.", categoryId: "strength-lifting" },
  { name: "Wilks Score Calculator", slug: "wilks-score-calculator", description: "Compare powerlifting strength across different bodyweights.", categoryId: "strength-lifting" },
  { name: "DOTS Score Calculator", slug: "dots-score-calculator", description: "Use the modern DOTS formula to evaluate powerlifting totals.", categoryId: "strength-lifting" },
  { name: "IPF Points Calculator", slug: "ipf-points-calculator", description: "Calculate your official International Powerlifting Federation points.", categoryId: "strength-lifting" },
  { name: "Strength Level Estimator", slug: "strength-level-estimator", description: "See where you rank from beginner to elite.", categoryId: "strength-lifting" },
  { name: "Powerlifting Total Calculator", slug: "powerlifting-total-calculator", description: "Sum your best squat, bench, and deadlift.", categoryId: "strength-lifting" },
  { name: "Training Max Calculator", slug: "training-max-calculator", description: "Determine optimal working weights for lifting programs.", categoryId: "strength-lifting" },
  { name: "RPE to Percent Calculator", slug: "rpe-to-percent-calculator", description: "Convert Rate of Perceived Exertion to percentage of 1RM.", categoryId: "strength-lifting" },
  { name: "Volume Load Calculator", slug: "volume-load-calculator", description: "Track total weight lifted per session or exercise.", categoryId: "strength-lifting" },
  { name: "Weekly Training Volume Calculator", slug: "weekly-training-volume", description: "Ensure you're hitting optimal sets per muscle group.", categoryId: "strength-lifting" },
  { name: "Progressive Overload Tracker", slug: "progressive-overload-tracker", description: "Calculate the required increments for consistent gains.", categoryId: "strength-lifting" },
  { name: "Plate Loading Calculator", slug: "plate-loading-calculator", description: "Quickly figure out which plates to put on the barbell.", categoryId: "strength-lifting" },
  { name: "Dumbbell Weight Estimator", slug: "dumbbell-weight-estimator", description: "Convert barbell working weights to dumbbell equivalents.", categoryId: "strength-lifting" },
  { name: "Bench Press Ratio Calculator", slug: "bench-press-ratio-calculator", description: "Compare your bench press to your bodyweight.", categoryId: "strength-lifting" },
  { name: "Running Pace Calculator", slug: "running-pace-calculator", description: "Find the required pace for your target distance and time.", categoryId: "cardio-running" },
  { name: "Marathon Finish Time Predictor", slug: "marathon-finish-time", description: "Estimate your marathon time based on shorter race results.", categoryId: "cardio-running" },
  { name: "Half Marathon Finish Time", slug: "half-marathon-finish-time", description: "Predict your half marathon performance.", categoryId: "cardio-running" },
  { name: "5K Finish Time Predictor", slug: "5k-finish-time-predictor", description: "Gauge your 5K potential from training times.", categoryId: "cardio-running" },
  { name: "VO2 Max Estimator", slug: "vo2-max-estimator", description: "Assess your aerobic fitness and oxygen utilization.", categoryId: "cardio-running" },
  { name: "Heart Rate Zone Calculator", slug: "heart-rate-zone-calculator", description: "Determine your target zones for specific training goals.", categoryId: "cardio-running" },
  { name: "Max Heart Rate Calculator", slug: "max-heart-rate-calculator", description: "Calculate your MHR using age-based formulas.", categoryId: "cardio-running" },
  { name: "Fat Burning Zone Calculator", slug: "fat-burning-zone-calculator", description: "Find the optimal heart rate for fat oxidation.", categoryId: "cardio-running" },
  { name: "Running Calorie Burn", slug: "running-calorie-burn", description: "Precisely estimate calories burned during a run.", categoryId: "cardio-running" },
  { name: "Treadmill Pace Converter", slug: "treadmill-pace-converter", description: "Translate mph or km/h into minutes per mile or km.", categoryId: "cardio-running" },
  { name: "Run/Walk Interval Calculator", slug: "run-walk-interval-calculator", description: "Plan your intervals for the Galloway method.", categoryId: "cardio-running" },
  { name: "Race Time Predictor (Riegel)", slug: "race-time-predictor", description: "Use Riegel's formula for accurate race predictions.", categoryId: "cardio-running" },
  { name: "Aerobic Threshold Calculator", slug: "aerobic-threshold-calculator", description: "Identify the limit of your aerobic base building zone.", categoryId: "cardio-running" },
  { name: "Lactate Threshold Estimator", slug: "lactate-threshold-estimator", description: "Find the intensity where lactate begins to accumulate.", categoryId: "cardio-running" },
  { name: "Steps to Miles/Km Converter", slug: "steps-to-miles-km-converter", description: "Convert your daily step count into actual distance.", categoryId: "cardio-running" },
  { name: "Sleep Cycle Calculator", slug: "sleep-cycle-calculator", description: "Find the best times to fall asleep or wake up feeling refreshed.", categoryId: "sleep-recovery" },
  { name: "Optimal Wake Time Calculator", slug: "optimal-wake-time-calculator", description: "Avoid waking up mid-cycle to prevent grogginess.", categoryId: "sleep-recovery" },
  { name: "Sleep Debt Calculator", slug: "sleep-debt-calculator", description: "Estimate how much rest you need to make up.", categoryId: "sleep-recovery" },
  { name: "REM Sleep Estimator", slug: "rem-sleep-estimator", description: "Calculate the proportion of deep sleep you're likely getting.", categoryId: "sleep-recovery" },
  { name: "Nap Duration Optimizer", slug: "nap-duration-optimizer", description: "Plan the perfect power nap to boost alertness.", categoryId: "sleep-recovery" },
  { name: "Recovery Score Estimator", slug: "recovery-score-estimator", description: "Evaluate readiness based on resting metrics and sleep.", categoryId: "sleep-recovery" },
  { name: "Sleep Quality Index", slug: "sleep-quality-index", description: "Score your sleep quality across multiple dimensions.", categoryId: "sleep-recovery" },
  { name: "Circadian Rhythm Calculator", slug: "circadian-rhythm-calculator", description: "Find your chronotype and optimal daily schedule.", categoryId: "sleep-recovery" },
  { name: "Menstrual Cycle Calculator", slug: "menstrual-cycle-calculator", description: "Predict your next period and track cycle phases.", categoryId: "womens-health" },
  { name: "Ovulation Calculator", slug: "ovulation-calculator", description: "Find your most fertile days each cycle.", categoryId: "womens-health" },
  { name: "Due Date Calculator", slug: "due-date-calculator", description: "Calculate your estimated pregnancy due date.", categoryId: "womens-health" },
  { name: "Pregnancy Weight Gain Calculator", slug: "pregnancy-weight-gain", description: "Find your recommended pregnancy weight gain range.", categoryId: "womens-health" },
  { name: "Fertility Window Calculator", slug: "fertility-window-calculator", description: "Identify your most fertile days each cycle.", categoryId: "womens-health" },
  { name: "Prenatal Nutrition Calculator", slug: "prenatal-nutrition-calculator", description: "Get trimester-specific nutrient recommendations.", categoryId: "womens-health" },
  { name: "Postpartum Recovery Calculator", slug: "postpartum-recovery-calculator", description: "Track your recovery timeline after childbirth.", categoryId: "womens-health" },
  { name: "Menopause Symptom Calculator", slug: "menopause-symptom-calculator", description: "Assess your menopause symptom severity.", categoryId: "womens-health" },
  { name: "Hormonal Balance Calculator", slug: "hormonal-balance-calculator", description: "Identify potential hormonal imbalance patterns.", categoryId: "womens-health" },
  { name: "PCOS Risk Calculator", slug: "pcos-risk-calculator", description: "Assess your PCOS risk level based on symptoms.", categoryId: "womens-health" },
  { name: "Child Height Predictor", slug: "child-height-predictor", description: "Predict your child's adult height from parent heights.", categoryId: "age-growth" },
  { name: "Growth Percentile Calculator", slug: "growth-percentile-calculator", description: "Find your child's height or weight percentile.", categoryId: "age-growth" },
  { name: "Pediatric BMI Calculator", slug: "pediatric-bmi-calculator", description: "Calculate BMI percentile for children and teens.", categoryId: "age-growth" },
  { name: "Biological Age Calculator", slug: "biological-age-calculator", description: "Estimate your biological age based on lifestyle factors.", categoryId: "age-growth" },
  { name: "Longevity Score Calculator", slug: "longevity-score-calculator", description: "Score your lifestyle against longevity research.", categoryId: "age-growth" },
  { name: "Bone Health Calculator", slug: "bone-health-calculator", description: "Assess your bone health and osteoporosis risk factors.", categoryId: "age-growth" },
  { name: "Cognitive Age Calculator", slug: "cognitive-age-calculator", description: "Estimate your brain health age from lifestyle factors.", categoryId: "age-growth" },
  { name: "Healthy Aging Calculator", slug: "healthy-aging-calculator", description: "Get a comprehensive healthy aging score.", categoryId: "age-growth" },
  { name: "Life Expectancy Calculator", slug: "life-expectancy-calculator", description: "Estimate your life expectancy based on lifestyle factors.", categoryId: "age-growth" },
  { name: "Adult Height Predictor", slug: "adult-height-predictor", description: "Predict final adult height for children.", categoryId: "age-growth" },
  { name: "Creatine Loading Calculator", slug: "creatine-loading-calculator", description: "Calculate your optimal creatine loading and maintenance dose.", categoryId: "supplements-health" },
  { name: "Protein Powder Calculator", slug: "protein-powder-calculator", description: "Find how much protein powder you need to meet your targets.", categoryId: "supplements-health" },
  { name: "Pre-Workout Dosage Calculator", slug: "pre-workout-dosage", description: "Calculate your safe caffeine and pre-workout dose.", categoryId: "supplements-health" },
  { name: "Vitamin C Calculator", slug: "vitamin-c-calculator", description: "Find your daily Vitamin C requirements.", categoryId: "supplements-health" },
  { name: "Magnesium Calculator", slug: "magnesium-calculator", description: "Calculate your daily magnesium needs.", categoryId: "supplements-health" },
  { name: "Omega-3 Dosage Calculator", slug: "omega-3-dosage-calculator", description: "Calculate your optimal fish oil supplement dose.", categoryId: "supplements-health" },
  { name: "Caffeine Intake Calculator", slug: "caffeine-intake-calculator", description: "Calculate your safe daily caffeine limit.", categoryId: "supplements-health" },
  { name: "Collagen Supplement Calculator", slug: "collagen-supplement-calculator", description: "Determine your optimal collagen peptide dose.", categoryId: "supplements-health" },
  { name: "BCAA Calculator", slug: "bcaa-calculator", description: "Calculate your branched-chain amino acid dose.", categoryId: "supplements-health" },
  { name: "Zinc Calculator", slug: "zinc-calculator", description: "Find your daily zinc requirement.", categoryId: "supplements-health" },
  { name: "Stress Score Calculator", slug: "stress-score-calculator", description: "Measure your current stress level across key life dimensions.", categoryId: "wellness-lifestyle" },
  { name: "Happiness Index Calculator", slug: "happiness-index-calculator", description: "Score your subjective well-being across life dimensions.", categoryId: "wellness-lifestyle" },
  { name: "Screen Time Impact Calculator", slug: "screen-time-impact", description: "Assess the health impact of your daily screen time.", categoryId: "wellness-lifestyle" },
  { name: "Work-Life Balance Score", slug: "work-life-balance-score", description: "Evaluate your work-life balance and identify gaps.", categoryId: "wellness-lifestyle" },
  { name: "Social Wellness Calculator", slug: "social-wellness-calculator", description: "Assess the quality and depth of your social connections.", categoryId: "wellness-lifestyle" },
  { name: "Financial Wellness Score", slug: "financial-wellness-score", description: "Score your financial health across key dimensions.", categoryId: "wellness-lifestyle" },
  { name: "Alcohol Impact Calculator", slug: "alcohol-impact-calculator", description: "Understand the health impact of your alcohol consumption.", categoryId: "wellness-lifestyle" },
  { name: "Smoking Impact Calculator", slug: "smoking-impact-calculator", description: "Calculate the health and financial cost of smoking.", categoryId: "wellness-lifestyle" },
  { name: "Sedentary Time Calculator", slug: "sedentary-time-calculator", description: "Assess the health risk of your daily sitting time.", categoryId: "wellness-lifestyle" },
  { name: "Mindfulness Score Calculator", slug: "mindfulness-score-calculator", description: "Evaluate your mindfulness practice and get guidance.", categoryId: "wellness-lifestyle" },
  { name: "Recipe Scaling Calculator", slug: "recipe-scaling-calculator", description: "Scale any recipe up or down easily.", categoryId: "cooking-kitchen" },
  { name: "Cooking Unit Converter", slug: "cooking-unit-converter", description: "Convert between all cooking measurement units.", categoryId: "cooking-kitchen" },
  { name: "Serving Size Calculator", slug: "serving-size-calculator", description: "Determine per-serving amounts from total recipe weights.", categoryId: "cooking-kitchen" },
  { name: "Food Temperature Converter", slug: "food-temperature-converter", description: "Convert between Fahrenheit and Celsius for cooking.", categoryId: "cooking-kitchen" },
  { name: "Oven Temperature Converter", slug: "oven-temperature-converter", description: "Convert between conventional, fan, and gas mark temperatures.", categoryId: "cooking-kitchen" },
  { name: "Kitchen Measurement Converter", slug: "measurement-converter", description: "Convert cups, tablespoons, and teaspoons in one place.", categoryId: "cooking-kitchen" },
  { name: "Baking Substitution Calculator", slug: "baking-substitution-calculator", description: "Find accurate substitutions for common baking ingredients.", categoryId: "cooking-kitchen" },
  { name: "Pan Size Converter", slug: "pan-size-converter", description: "Convert baking pan sizes for substitutions.", categoryId: "cooking-kitchen" },
  { name: "Cooking Time Calculator", slug: "cooking-time-calculator", description: "Calculate estimated cooking time for meat and poultry.", categoryId: "cooking-kitchen" },
  { name: "Ingredient Ratio Calculator", slug: "ingredient-ratio-calculator", description: "Find correct ingredient ratios for classic recipes.", categoryId: "cooking-kitchen" },
  { name: "Glycemic Index Calculator", slug: "glycemic-index-calculator", description: "Look up the glycemic index of common foods.", categoryId: "food-nutrition-diet" },
  { name: "Glycemic Load Calculator", slug: "glycemic-load-calculator", description: "Calculate the glycemic load of your meal.", categoryId: "food-nutrition-diet" },
  { name: "Anti-Inflammatory Diet Score", slug: "anti-inflammatory-diet-score", description: "Score your diet's anti-inflammatory potential.", categoryId: "food-nutrition-diet" },
  { name: "Mediterranean Diet Score", slug: "mediterranean-diet-score", description: "Measure your adherence to the Mediterranean dietary pattern.", categoryId: "food-nutrition-diet" },
  { name: "Whole Food Score", slug: "whole-food-score", description: "Estimate the percentage of your diet from whole foods.", categoryId: "food-nutrition-diet" },
  { name: "Processed Food Calculator", slug: "processed-food-calculator", description: "Assess how much of your diet is ultra-processed.", categoryId: "food-nutrition-diet" },
  { name: "Calorie Source Calculator", slug: "calorie-source-calculator", description: "Break down your total calories by macronutrient source.", categoryId: "food-nutrition-diet" },
  { name: "Nutritional Balance Score", slug: "nutritional-balance-score", description: "Score your diet's nutritional balance across food groups.", categoryId: "food-nutrition-diet" },
  { name: "Food Sensitivity Tracker", slug: "food-allergy-tracker", description: "Track symptoms against common trigger foods.", categoryId: "food-nutrition-diet" },
  { name: "Diet Diversity Score", slug: "diet-diversity-score", description: "Measure your dietary variety for gut microbiome health.", categoryId: "food-nutrition-diet" },
  { name: "Weekly Meal Planner", slug: "weekly-meal-planner", description: "Calculate calorie targets for each meal based on your TDEE.", categoryId: "meal-planning-grocery" },
  { name: "Grocery List Calculator", slug: "grocery-list-calculator", description: "Calculate weekly grocery quantities for your household.", categoryId: "meal-planning-grocery" },
  { name: "Meal Cost Calculator", slug: "meal-cost-calculator", description: "Calculate the cost per serving for any meal.", categoryId: "meal-planning-grocery" },
  { name: "Food Budget Calculator", slug: "food-budget-calculator", description: "Determine your recommended monthly food budget.", categoryId: "meal-planning-grocery" },
  { name: "Pantry Stock Calculator", slug: "pantry-stock-calculator", description: "Calculate pantry staple quantities for your household.", categoryId: "meal-planning-grocery" },
  { name: "Food Waste Calculator", slug: "food-waste-calculator", description: "Calculate the financial cost of your food waste.", categoryId: "meal-planning-grocery" },
  { name: "Batch Cooking Calculator", slug: "batch-cooking-calculator", description: "Scale recipes for efficient batch cooking.", categoryId: "meal-planning-grocery" },
  { name: "Protein per Dollar Calculator", slug: "protein-per-dollar-calculator", description: "Compare protein foods by cost-efficiency.", categoryId: "meal-planning-grocery" },
];

function highlight(text, query) {
  if (!query) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return text.replace(new RegExp(`(${escaped})`, 'gi'), '<mark class="search-highlight">$1</mark>');
}

function createCardHTML(calc, category, query) {
  const name = query ? highlight(calc.name, query) : calc.name;
  const desc = query ? highlight(calc.description, query) : calc.description;
  return `
    <a href="/calculators/${calc.slug}/" class="calc-card group">
      <div>
        <h3 class="calc-card-title">${name}</h3>
        <p class="calc-card-desc">${desc}</p>
      </div>
      <div class="calc-card-footer">
        <span class="calc-category-tag">${category.icon} ${category.name}</span>
        <span class="calc-arrow">→</span>
      </div>
    </a>
  `;
}

function createAdHTML() {
  return `
    <div class="ad-unit" data-ad="homepage-after-category">
      <span class="ad-label">Advertisement</span>
      <div class="ad-box-responsive">Responsive Ad Space</div>
    </div>
  `;
}

function getCategoryCalculators(categoryId) {
  return calculators.filter(calc => calc.categoryId === categoryId);
}

function renderRecentlyViewed() {
  const section = document.getElementById('recently-viewed-section');
  const list = document.getElementById('recently-viewed-list');
  const clearBtn = document.getElementById('clear-recent-btn');
  if (!section || !list) return;

  const KEY = 'nutryio_recent';

  function draw() {
    let recent = [];
    try { recent = JSON.parse(localStorage.getItem(KEY) || '[]'); } catch (_) {}
    if (recent.length === 0) {
      section.classList.add('hidden');
      return;
    }
    section.classList.remove('hidden');
    list.innerHTML = recent.map(item => `
      <a href="/calculators/${item.slug}/" class="recent-card">
        <div class="recent-card-body">
          <div class="recent-card-name">${item.name}</div>
          <div class="recent-card-cat">${item.category}</div>
        </div>
        <span class="recent-card-arrow">→</span>
      </a>
    `).join('');
  }

  draw();

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      localStorage.removeItem(KEY);
      section.classList.add('hidden');
    });
  }
}

function renderPage() {
  const categoryPillsContainer = document.getElementById("category-pills");
  const categoriesContainer = document.getElementById("categories-container");
  const footerCategoriesContainer = document.getElementById("footer-categories");

  // Build all pills HTML at once to avoid repeated innerHTML += DOM thrashing
  let pillsHTML = `
    <button class="pill-btn all-tools active" data-id="all">
      All Tools
    </button>
  `;

  let sectionsHTML = '';

  // Render Category Pills & Sections
  categories.forEach((cat, index) => {
    const catCalcs = getCategoryCalculators(cat.id);
    if (catCalcs.length === 0) return;

    pillsHTML += `
      <button class="pill-btn" data-id="${cat.id}">
        <span class="pill-icon">${cat.icon}</span>
        ${cat.name}
        <span class="pill-count">${catCalcs.length}</span>
      </button>
    `;

    sectionsHTML += `
      <div class="category-section" id="section-${cat.id}">
        <div class="category-header">
          <span class="category-icon">${cat.icon}</span>
          <h2 class="category-title">${cat.name}</h2>
          <span class="category-count">${catCalcs.length}</span>
        </div>
        <div class="calculator-grid">
          ${catCalcs.map(calc => createCardHTML(calc, cat)).join('')}
        </div>
      </div>
    `;

    // Responsive ad after every category section
    sectionsHTML += createAdHTML();
  });

  // Set innerHTML once each — avoids repeated DOM rebuilds from +=
  categoryPillsContainer.innerHTML = pillsHTML;
  categoriesContainer.innerHTML = sectionsHTML;

  // Render Footer Top Categories (first 5) — guard against missing element
  if (footerCategoriesContainer) {
    footerCategoriesContainer.innerHTML = categories.slice(0, 5).map(cat =>
      `<li><button class="footer-nav-btn" data-id="${cat.id}">${cat.name}</button></li>`
    ).join('');
  }

  setupInteractions();
}

function setupInteractions() {
  const searchInput = document.getElementById('search-input');
  const searchClear = document.getElementById('search-clear');
  const searchHint = document.getElementById('search-hint');
  const searchCategoryFilter = document.getElementById('search-category-filter');
  const searchResultsArea = document.getElementById('search-results-area');
  const categoriesContainer = document.getElementById('categories-container');
  const searchResultsGrid = document.getElementById('search-results-grid');
  const noResults = document.getElementById('no-results');
  const searchCount = document.getElementById('search-count');
  const pills = document.querySelectorAll('.pill-btn');
  const menuBtn = document.getElementById('menu-btn');
  const mobileNav = document.getElementById('mobile-nav');

  let activeCatFilter = 'all';

  // Popular searches — chips are static HTML; just wire up click handlers
  const popularSearchesEl = document.getElementById('popular-searches');
  popularSearchesEl.querySelectorAll('.popular-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      searchInput.value = chip.dataset.term;
      searchInput.focus();
      runSearch(chip.dataset.term);
    });
  });

  function clearSearch() {
    searchInput.value = '';
    searchClear.classList.add('hidden');
    searchHint.classList.remove('hidden');
    searchResultsArea.classList.add('hidden');
    searchCategoryFilter.classList.add('hidden');
    popularSearchesEl.classList.remove('hidden');
    categoriesContainer.classList.remove('hidden');
    activeCatFilter = 'all';
    updateActivePillFromScroll();
  }

  function runSearch(rawQuery) {
    const query = rawQuery.toLowerCase().trim();

    if (query === '') { clearSearch(); return; }

    // Show clear button, hide keyboard hint and popular chips
    searchClear.classList.remove('hidden');
    searchHint.classList.add('hidden');
    popularSearchesEl.classList.add('hidden');

    // Rank: name matches first, then description, then category name
    const withScore = calculators.map(calc => {
      const cat = categories.find(c => c.id === calc.categoryId);
      const nameLower = calc.name.toLowerCase();
      const descLower = calc.description.toLowerCase();
      const catLower = cat ? cat.name.toLowerCase() : '';
      if (nameLower.includes(query)) return { calc, cat, score: 0 };
      if (descLower.includes(query)) return { calc, cat, score: 1 };
      if (catLower.includes(query)) return { calc, cat, score: 2 };
      return null;
    }).filter(Boolean).sort((a, b) => a.score - b.score);

    // Apply category filter
    const filtered = activeCatFilter === 'all'
      ? withScore
      : withScore.filter(({ calc }) => calc.categoryId === activeCatFilter);

    // Build category filter tabs from matched results
    const matchedCatIds = [...new Set(withScore.map(({ calc }) => calc.categoryId))];
    searchCategoryFilter.innerHTML = `<button class="search-cat-btn${activeCatFilter === 'all' ? ' active' : ''}" data-cat="all">All (${withScore.length})</button>` +
      matchedCatIds.map(id => {
        const cat = categories.find(c => c.id === id);
        const count = withScore.filter(({ calc }) => calc.categoryId === id).length;
        return `<button class="search-cat-btn${activeCatFilter === id ? ' active' : ''}" data-cat="${id}">${cat.icon} ${cat.name} (${count})</button>`;
      }).join('');
    searchCategoryFilter.classList.remove('hidden');

    // Wire up filter tabs
    searchCategoryFilter.querySelectorAll('.search-cat-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeCatFilter = btn.dataset.cat;
        runSearch(searchInput.value);
      });
    });

    searchResultsArea.classList.remove('hidden');
    categoriesContainer.classList.add('hidden');
    searchCount.textContent = filtered.length;

    // Clear active state on nav pills when searching
    pills.forEach(p => p.classList.remove('active'));
    const allBtn = document.querySelector('.pill-btn.all-tools');
    if (allBtn) allBtn.classList.add('active');

    if (filtered.length > 0) {
      noResults.classList.add('hidden');
      searchResultsGrid.classList.remove('hidden');
      searchResultsGrid.innerHTML = filtered.map(({ calc, cat }) =>
        createCardHTML(calc, cat, rawQuery.trim())
      ).join('');
    } else {
      noResults.classList.remove('hidden');
      searchResultsGrid.classList.add('hidden');
    }
  }

  // Search Logic
  searchInput.addEventListener('input', (e) => runSearch(e.target.value));

  // Clear button
  searchClear.addEventListener('click', () => { clearSearch(); searchInput.focus(); });

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      searchInput.focus();
      searchInput.select();
    }
    if (e.key === 'Escape' && searchInput.value !== '') {
      clearSearch();
    }
  });

  // Pill Navigation
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      const id = pill.dataset.id;
      
      // Clear search
      searchInput.value = '';
      searchResultsArea.classList.add('hidden');
      categoriesContainer.classList.remove('hidden');

      if (id === 'all') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const section = document.getElementById(`section-${id}`);
        if (section) {
          const headerOffset = 140; // Adjust for sticky header + pills
          const elementPosition = section.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }
    });
  });

  // Footer Category Links
  document.querySelectorAll('.footer-nav-btn, .nav-scroll-btn, .mobile-nav-scroll-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.dataset.id;
      
      // Clear search
      searchInput.value = '';
      searchResultsArea.classList.add('hidden');
      categoriesContainer.classList.remove('hidden');

      if (id) {
        const section = document.getElementById(`section-${id}`);
        if (section) {
          const headerOffset = 140;
          const elementPosition = section.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      } else {
        // If it's just a general scroll to categories
        const container = document.getElementById('categories');
        if (container) {
          const headerOffset = 80;
          const elementPosition = container.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      }
    });
  });

  // Scroll Observer for Active Pill
  const sections = document.querySelectorAll('.category-section');
  const SCROLL_OFFSET = 130; // sticky header (64px) + pill nav (~66px)

  function updateActivePillFromScroll() {
    if (searchInput.value.trim() !== '') return; // Don't update pills if searching

    let currentSectionId = 'all';

    if (window.scrollY >= 200) {
      // Walk sections in order; keep updating as long as the section top
      // has scrolled at or above the offset — the last one wins.
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= SCROLL_OFFSET) {
          currentSectionId = section.id.replace('section-', '');
        } else {
          break; // sections are in document order; once one is below, rest are too
        }
      }
    }

    pills.forEach(pill => {
      if (pill.dataset.id === currentSectionId) {
        if (!pill.classList.contains('active')) {
          pill.classList.add('active');
          // Ensure pill is visible in scroll container
          const container = document.querySelector('.category-nav');
          const pillLeft = pill.offsetLeft;
          const pillWidth = pill.offsetWidth;
          const containerWidth = container.offsetWidth;
          const scrollLeft = container.scrollLeft;

          if (pillLeft < scrollLeft || (pillLeft + pillWidth) > (scrollLeft + containerWidth)) {
            container.scrollTo({
              left: pillLeft - containerWidth / 2 + pillWidth / 2,
              behavior: 'smooth'
            });
          }
        }
      } else {
        pill.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', updateActivePillFromScroll, { passive: true });
}

document.addEventListener('DOMContentLoaded', () => {
  renderRecentlyViewed();
  renderPage();
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
});
