export interface FoodItem {
  name: string;
  supermarket: string;
  category: string;
  amountPer: string;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  cholesterol: number;
  saturatedFat: number;
  calcium: number;
  iron: number;
  sodium: number;
  magnesium: number;
  calories: number;
}

function calculateCalories(protein: number, carbs: number, fat: number): number {
  return Math.round(protein * 4 + carbs * 4 + fat * 9);
}

const rawData = `Ingredients,Supermarket,Category,Amount Per,Protein (g),Carbs (g),Fat (g),Fiber (g),Sugar (g),Cholesterol (mg),Saturated Fat (g),Calcium (mg),Iron (mg),Sodium (mg),Magnesium (mg)
Muller Myprotein Vanilla High Protein Pudding,Tesco,Sandwich,1 Package,20,13.4,3.6,,8.8,,2.4,,,165,
Muller Myprotein Chocolate High Protein Pudding,Tesco,Sandwich,1 Package,20,13.4,3.6,,8.8,,2.4,,,165,
Tesco Chicken Salad Sandwich,Tesco,Sandwich,1 Package,26,48.8,5.8,4.3,4.5,,0.9,,,420,
Tesco Chicken Tikka & Mango Chutney Sandwich,Tesco,Sandwich,1 Package,21.9,49,4.6,4.2,8.6,,1.0,,,440,
Tesco Chicken & Sweetcorn Sandwich,Tesco,Sandwich,1 Package,20.4,44.2,6.8,3.3,3.1,,1.0,,,369,
Tesco Prawn Mayonnaise Sandwich,Tesco,Sandwich,1 Package,17.6,46.8,6.7,3.4,3.1,,1.0,,,820,
Tesco Finest Smoked Scottish Salmon & Cream Cheese Sandwich,Tesco,Sandwich,1 Package,20.5,51.1,16.1,3.8,4.6,,1.0,,,820,
Tesco Finest New York Deli Inspired Pastrami & Emmental Sandwich,Tesco,Sandwich,1 Package,27.1,49.5,12.4,4.1,4.1,,2.2,,,820,
Tesco The Chicken Club Sandwich,Tesco,Sandwich,1 Package,29.9,56.5,16.9,4.0,5.0,,6.7,,,714,
Tesco Turkey & Trimmings Sandwich,Tesco,Sandwich,1 Package,29.8,58.3,9.9,5.6,7.1,,2.6,,,831,
Tesco Tuna & Cucumber Sandwich,Tesco,Sandwich,1 Package,18.6,44.3,7.2,3.3,3.9,,0.9,,,512,
Tesco Plant Chef All Day Breakfast Sandwich (V),Tesco,Sandwich,1 Package,21.7,52.8,9.2,4.4,6.0,,1.9,,,743,
Tesco Pulled Beef & Red Leicester Sandwich,Tesco,Sandwich,1 Package,21.1,51.2,13.5,2.5,12,,5.8,,,688,
Tesco Chicken Triple Sandwich,Tesco,Sandwich,1 Package,32.1,63.9,12.9,4.8,5.4,,2.4,,,730,
Tesco Bbq Chicken Bacon & Cheese Sandwich,Tesco,Sandwich,1 Package,28.6,55,12.4,3.2,9.9,,4.8,,,850,
Tesco Chicken Bacon & Lettuce Sandwich,Tesco,Sandwich,1 Package,28.7,45,13.3,3.0,3.0,,3.6,,,617,
M&S ROAST CHICKEN AND SWEETCORN ON MALTED BROWN BREAD,M&S,Sandwich,1 Package,26.0,51.2,12.9,4.7,3.4,,1.7,,,714,
M&S Roast Chicken & Stuffing Sandwich (210g),M&S,Sandwich,1 Package,28.4,44.3,20.0,4.6,3.4,,5.9,,,991,
M&S Roast Chicken & Stuffing Sandwich (218g),M&S,Sandwich,1 Package,29.0,60.4,13.3,5.2,4.4,,2.6,,,724,
M&S Poached Salmon and Watercress Sandwich,M&S,Sandwich,1 Package,21.0,47.9,19.7,4.8,3.8,,4.6,,,708,
M&S Our Best Ever Beef & Hot Horseradish Sandwich,M&S,Sandwich,1 Package,33.1,48.1,18.8,4.0,6.2,,5.5,,,552,
M&S Chicken Tikka Sandwich,M&S,Sandwich,1 Package,26.4,47.8,16.6,5.7,7.4,,5.5,,,696,
M&S Pastrami New Yorker Bagel,M&S,Sandwich,1 Package,19.7,44.4,10.5,3.4,6.4,,3.2,,,1004,
M&S Turkey Feast Sandwich (216g),M&S,Sandwich,1 Package,27.0,52.3,20.5,4.8,11.9,,6.7,,,1148,
M&S Smoked BBQ Chicken Roll,M&S,Sandwich,1 Package,19.3,35.3,9.7,2.4,12.6,,2.5,,,827,
M&S Coronation Chicken Sandwich,M&S,Sandwich,1 Package,22.1,52.0,15.4,4.9,12.4,,5.1,,,630,
M&S Roast Chicken and Bacon Sandwich,M&S,Sandwich,1 Package,33.4,47.4,18.9,4.7,2.5,,4.3,,,927,
M&S New York Deli Pastrami Sandwich,M&S,Sandwich,1 Package,24.3,38.9,13.1,5.0,4.2,,3.5,,,915,
M&S Tuna & Sweetcorn Sandwich (Forever Fish),M&S,Sandwich,1 Package,23.5,50.6,12.7,6.3,4.5,,2.0,,,676,
M&S Ham and Mustard Sandwich,M&S,Sandwich,1 Package,17.7,32.8,9.5,2.8,1.4,,1.8,,,944,
M&S The Festive Club,M&S,Sandwich,1 Package,28.2,70.8,14.9,5.1,14.6,,2.9,,,1200,
M&S Roast Chicken and Salad Sandwich (232g),M&S,Sandwich,1 Package,40.4,26.9,8.6,6.0,2.3,,1.9,,,536,
M&S Roast Chicken & Avocado,M&S,Sandwich,1 Package,28.0,47.8,15.3,6.7,3.8,,3.3,,,860,
M&S Beef & Onion Peppercorn Mayo Roll,M&S,Sandwich,1 Package,24.6,50.1,16.5,4.7,8.1,,4.5,,,924,
M&S Roast Chicken & Sweetcorn Sandwich,M&S,Sandwich,1 Package,23.3,43.2,16.1,5.7,3.5,,4.5,,,756,
M&S Tuna & Sweetcorn Sandwich (Eat Well),M&S,Sandwich,1 Package,25.6,44.5,15.3,5.8,4.0,,1.9,,,636,
M&S Irish Turkey Feast Sandwich (223g),M&S,Sandwich,1 Package,28.1,62.9,17.6,4.5,8.5,,4.2,,,1024,
M&S The Club Sandwich,M&S,Sandwich,1 Package,29.7,41.2,19.7,5.9,1.4,,4.7,,,868,
M&S Tuna and Cucumber Baguette,M&S,Sandwich,1 Package,24.0,49.3,16.8,2.4,2.2,,5.0,,,656,
M&S Roast Beef and Horseradish Mayo Sandwich,M&S,Sandwich,1 Package,24.3,40.6,16.3,2.9,4.5,,4.5,,,1000,
M&S Christmas Club,M&S,Sandwich,1 Package,24.7,66.6,27.0,5.9,15.9,,4.2,,,764,
M&S Roast Chicken and Salad Sandwich (235g),M&S,Sandwich,1 Package,27.7,46.1,6.1,5.9,4.5,,1.2,,,636,
M&S Half and Half Sandwich,M&S,Sandwich,1 Package,24.4,46.3,16.6,5.0,4.8,,4.0,,,871,
M&S Plant Kitchen New York Style No Salt-Beef,M&S,Sandwich,1 Package,16.6,46.2,15.8,4.5,5.5,,4.9,,,1284,
Sainsbury's Steak & Caramelised Onion Sandwich,Sainsbury's,Sandwich,1 Package,22.1,57.7,12.1,3.2,13.9,,2.6,,,640,
Sainsbury's Festive Duck Brioche Roll,Sainsbury's,Sandwich,1 Package,19.9,62.6,16.9,3.9,16.3,,3.7,,,600,
Sainsbury's Christmas Cracker Club Sandwich,Sainsbury's,Sandwich,1 Package,25.6,64.2,13.4,4.9,6.6,,2.6,,,920,
Sainsbury's Maple Cured Bacon Lettuce & Tomato,Sainsbury's,Sandwich,1 Package,20.8,41.2,14.7,3.8,5.8,,4.1,,,600,
Sainsbury's Chicken & Sweetcorn Sandwich,Sainsbury's,Sandwich,1 Package,20.4,44.9,6.5,4.3,4.5,,1.1,,,440,
Sainsbury's Prawn Mayo Sandwich,Sainsbury's,Sandwich,1 Package,13.8,43.3,6.0,3.1,2.5,,0.8,,,720,
Sainsbury's Tuna Mayo Sandwich,Sainsbury's,Sandwich,1 Package,16.6,34.9,6.6,3.2,3.3,,0.7,,,400,
Sainsbury's Tuna & Sweetcorn Sandwich,Sainsbury's,Sandwich,1 Package,21.9,42.6,7.4,3.6,5.1,,1.0,,,440,
Sainsbury's Chicken & Maple Cured Bacon Sandwich,Sainsbury's,Sandwich,1 Package,27.8,45.8,14.7,3.9,3.9,,3.4,,,640,
Sainsbury's Chicken Salad Sandwich,Sainsbury's,Sandwich,1 Package,27.5,50.7,8.1,5.0,4.6,,1.2,,,520,
Sainsbury's Beef Horseradish Mayonnaise Sandwich,Sainsbury's,Sandwich,1 Package,21.9,44.3,9.3,2.9,5.5,,1.5,,,680,
Sainsbury's Spanish Style Chicken Sandwich,Sainsbury's,Sandwich,1 Package,23.2,44.1,18.4,2.5,4.5,,3.2,,,880,
Sainsbury's Turkey Feast Sandwich,Sainsbury's,Sandwich,1 Package,22.3,50.5,8.8,4.7,7.3,,1.9,,,720,
Sainsbury's Smoked Salmon & Cream Cheese,Sainsbury's,Sandwich,1 Package,18.6,38.7,14.5,3.8,3.8,,3.9,,,800,
Sainsbury's New Yorker Sandwich,Sainsbury's,Sandwich,1 Package,25.7,50.0,13.4,6.2,7.6,,5.9,,,880,
Sainsbury's Greek Style Chicken & Tzatziki,Sainsbury's,Sandwich,1 Package,19.6,50.8,18.0,3.5,2.8,,5.3,,,600,
Sainsbury's Plant Pioneers No Pigs Under Blankets,Sainsbury's,Sandwich,1 Package,17.4,51.3,13.9,5.7,4.3,,1.4,,,920,
Sainsbury's Festive Chicken Bacon & Stuffing Wrap,Sainsbury's,Sandwich,1 Package,19.5,59.5,11.4,3.8,5.6,,3.8,,,560,
Tesco Snack - The Gym Kitchen Chicken Tikka Bites,Tesco,Snack,1 Package,9.5,2.7,3.8,0.6,2.1,,1.8,,,160,
Tesco Snack - Kings BBQ Flavour Beef Jerky (20g),Tesco,Snack,1 Package,6.0,5.5,0.8,0.1,5.1,,0.3,,,345,
Tesco Snack - The Gym Kitchen High Protein BBQ Chicken Bites,Tesco,Snack,1 Package,9.5,3.9,4.1,0.6,2.1,,1.1,,,160,
Tesco Snack - Tesco Mango Chunks (120g),Tesco,Snack,1 Package,0.8,12.5,0.7,1.3,12.1,,0.2,,,4,
Tesco Snack - McVitie's The Original Jaffa Cakes (4 Pack),Tesco,Snack,1 Package,2.2,30.3,3.5,0.9,21.8,,1.8,,,48,
Tesco Snack - Soreen Banana Loaf 2 Slices,Tesco,Snack,1 Package,3.5,25.0,2.8,1.9,6.6,,0.9,,,108,
Tesco Snack - Maltesers Kingsize (58.5g),Tesco,Snack,1 Package,5.0,35.7,14.6,,31.0,,8.8,,,98,
Tesco Snack - Soreen Malt Loaf 2 Slices,Tesco,Snack,1 Package,3.1,27.0,2.2,1.5,9.0,,0.9,,,92,
Tesco Snack - Grenade Oreo Protein Bar,Tesco,Snack,1 Package,12.0,12.0,6.0,0.7,0.6,,3.3,,,84,
Tesco Snack - Graham's The Family Dairy Protein Pouch (200g),Tesco,Snack,1 Package,24.8,17.8,1.0,,13.0,,0.6,,,48,
Tesco Snack - Tesco Cucumber With Soured Cream & Chive Dip,Tesco,Snack,1 Package,1.0,3.8,6.8,0.6,2.4,,2.2,,,52,
Tesco Snack - Fridge Raiders Chicken & Stuffing Bites,Tesco,Snack,1 Package,8.8,3.0,4.3,,1.2,,0.9,,,240,
Tesco Snack - Grenade Protein Bar - White Chocolate Salted Peanut,Tesco,Snack,1 Package,12.0,11.0,7.0,1.4,1.2,,3.4,,,72,
Tesco Snack - Walkers Baked Cheese & Onion Grab Bag Crisps,Tesco,Snack,1 Package,2.3,27.0,4.8,2.3,2.7,,0.5,,,132,
Tesco Snack - Grenade Protein Bar Salted Caramel,Tesco,Snack,1 Package,12.0,12.0,5.4,1.4,0.8,,3.1,,,76,
Tesco Snack - Fridge Raiders Slow Roasted Chicken Bites,Tesco,Snack,1 Package,9.0,2.5,6.0,,0.5,,2.0,,,280,
Tesco Snack - Grenade Oreo White Chocolate Protein Bar,Tesco,Snack,1 Package,12.0,12.0,6.1,0.5,0.7,,3.4,,,92,
Tesco Snack - Propercorn Sweet & Salty,Tesco,Snack,1 Package,2.3,17.0,6.1,3.8,3.4,,0.5,,,80,
Tesco Snack - Fridge Raiders Smoky BBQ Chicken Bites,Tesco,Snack,1 Package,8.0,3.0,5.0,,1.0,,1.0,,,200,
Tesco Snack - Tesco Egg Protein Pot,Tesco,Snack,1 Package,11.3,1.4,7.6,0.6,0.2,,2.4,,,104,
Tesco Snack - Fulfil Vitamin & Protein Bar - Chocolate Peanut Butter,Tesco,Snack,1 Package,14.0,12.0,6.3,2.3,1.1,,2.8,,,36,
Tesco Snack - Activia Fibre Natural Yoghurt & Dark Chocolate Granola,Tesco,Snack,1 Package,9.4,25.0,5.0,2.8,16.0,,2.0,198,,100,
Tesco Snack - Mallow & Marsh Milk Chocolate Over Coconut Mallow,Tesco,Snack,1 Package,1.0,26.1,3.4,,21.3,,2.1,,,16,
Tesco Snack - Tesco Pineapple Chunks (145g),Tesco,Snack,1 Package,0.7,16.1,0.1,1.7,16.1,,0.0,,,4,
Tesco Snack - Kings Beef Biltong Rib Eye Flavour (20g),Tesco,Snack,1 Package,6.6,2.2,0.9,0.1,1.7,,0.4,,,566,
Tesco Snack - Fulfil Chocolate Brownie Vitamin & Protein Bar,Tesco,Snack,1 Package,13.8,14.1,4.5,1.8,0.8,,2.4,,,36,
Tesco Snack - Lindahls Protein Pudding Chocolate Brownie,Tesco,Snack,1 Package,14.0,10.4,0.4,,6.5,,0.3,,,76,
Tesco Snack - Fridge Raiders Grills Roast Chicken Fillet,Tesco,Snack,1 Package,7.5,1.0,0.3,,0.3,,0.1,,,140,
Tesco Snack - Tesco Carrot & Houmous,Tesco,Snack,1 Package,3.1,8.0,7.2,3.8,3.5,,0.8,,,160,
Tesco Snack - Tesco Pink Lady Apple & Grape Pot,Tesco,Snack,1 Package,0.4,12.6,0.1,2.3,12.6,,0.1,,,4,
Tesco Snack - Mallow & Marsh Dark Chocolate Over Raspberry Mallow,Tesco,Snack,1 Package,1.6,24.0,5.0,,15.9,,3.0,,,4,
Tesco Snack - Fridge Raiders Meat Free Slow Roasted Tasty Bites,Tesco,Snack,1 Package,9.4,3.5,6.6,2.4,1.1,,0.6,,,332,
Tesco Snack - Kellogg's Rice Krispies Squares Totally Chocolate,Tesco,Snack,1 Package,1.6,27.0,4.7,0.5,13.0,,3.7,,,88,
M&S Snack - Pink Lady Apple Slices (90g),M&S,Snack,1 Package,0.5,10.4,0.5,1.1,10.4,,0.1,,,0,
M&S Snack - Smoky Bean and Egg Pot,M&S,Snack,1 Package,11.0,11.2,9.7,5.3,2.9,,3.1,,,547,
M&S Snack - Defence Mango & Passion Fruit Yogurt Bowl,M&S,Snack,1 Package,11.2,37.8,11.2,8.0,23.2,,4.0,,,80,
M&S Snack - Five Berry Granola,M&S,Snack,1 Package,8.0,29.6,17.4,3.8,19.6,,8.8,,,80,
M&S Snack - Milk Chocolate Rice Cakes (34g),M&S,Snack,1 Package,2.7,22.3,6.9,0.7,9.0,,4.1,,,18,
M&S Snack - Mango and Berries Selection (115g),M&S,Snack,1 Package,0.8,9.8,0.6,2.5,9.7,,0.1,,,5,
M&S Snack - Salted Caramel Overnight Oats,M&S,Snack,1 Package,21.8,37.2,8.0,6.6,16.6,,3.0,,,320,
M&S Snack - Smoky Barbecue Flavour Popped Chips (23g),M&S,Snack,1 Package,1.5,16.7,2.4,0.9,1.5,,0.2,,,129,
M&S Snack - Pineapple Chunks (150g),M&S,Snack,1 Package,0.6,14.6,0.3,2.4,14.6,,0.1,,,6,
M&S Snack - Apple Crumble Overnight Oats,M&S,Snack,1 Package,19.0,44.2,5.4,5.0,18.6,,1.8,,,184,
M&S Snack - Colin the Caterpillar Chocolate Sponge Mini Roll,M&S,Snack,1 Package,3.1,30.7,11.4,0.4,26.9,,7.0,,,31,
M&S Snack - Chia Pudding,M&S,Snack,1 Package,9.4,10.8,17.2,13.2,5.8,,8.0,,,120,
M&S Snack - High Protein Banoffee Overnight Wheat Bisks,M&S,Snack,1 Package,15.8,33.8,1.6,1.8,21.2,,0.8,,,64,
M&S Snack - Shakshuka Pot,M&S,Snack,1 Package,11.9,11.9,16.2,3.1,4.2,,4.2,,,754,
M&S Snack - Strawberry Yogurt and Granola,M&S,Snack,1 Package,24.4,17.9,5.6,1.7,8.3,,1.5,,,37,
M&S Snack - Purely Grapes (120g),M&S,Snack,1 Package,0.7,13.9,0.6,2.0,13.9,,0.1,,,5,
M&S Snack - Loaded Gyozas,M&S,Snack,1 Package,3.2,24.7,6.3,2.9,11.3,,0.6,,,521,
M&S Snack - Turkish Style Egg Pot,M&S,Snack,1 Package,10.2,10.2,15.7,3.1,3.7,,7.2,,,604,
M&S Snack - Vanilla High Protein Yogurt and Granola,M&S,Snack,1 Package,24.2,17.4,6.8,1.3,8.1,,1.3,,,37,
M&S Snack - British Aberdeen Angus Peppered Beef Steak Jerky,M&S,Snack,1 Package,7.3,8.0,1.3,0.3,7.2,,0.5,,,350,
M&S Snack - Honey Barbecue Flavour Lentil Chips (30g),M&S,Snack,1 Package,3.8,17.5,6.2,1.0,1.1,,0.6,,,330,
M&S Snack - Brain Food Blueberry Yogurt Bowl,M&S,Snack,1 Package,12.0,34.0,9.4,6.8,20.8,,3.0,,,300,
M&S Snack - Almond and Cherry Bar,M&S,Snack,1 Package,3.2,17.1,4.9,3.7,14.9,,0.1,,,12,
M&S Snack - Sour Cream and Chive Flavoured Houmous Chips (30g),M&S,Snack,1 Package,4.1,17.0,6.1,1.3,1.3,,0.6,,,330,
M&S Snack - Cookies and Cream Protein Bar,M&S,Snack,1 Package,20.9,16.7,7.5,2.9,1.4,,3.8,,,127,
M&S Snack - Raspberry and Vanilla Protein Bar,M&S,Snack,1 Package,20.2,16.9,7.3,3.0,1.7,,3.8,,,127,
M&S Snack - Salted Caramel Protein Bar,M&S,Snack,1 Package,21.0,17.3,7.6,3.1,1.7,,4.0,,,429,
M&S Snack - Mixed Berry Bar,M&S,Snack,1 Package,3.6,14.7,5.7,4.8,14.0,,0.5,,,11,
M&S Snack - Peanut Butter Protein Bar,M&S,Snack,1 Package,20.5,15.5,9.3,3.1,1.9,,3.9,,,352,
M&S Snack - Banana and Chocolate Pressed Fruit Bar,M&S,Snack,1 Package,3.3,15.7,5.9,4.3,14.3,,1.0,,,11,
M&S Snack - Protein Ball (Cocoa & Peanut),M&S,Snack,1 Package,8.8,12.4,6.1,6.2,10.5,,0.8,,,112,
M&S Snack - Chargrilled Chicken with a Peanut Dip,M&S,Snack,1 Package,17.3,6.0,9.1,5.3,2.0,,2.0,,,585,
M&S Snack - Dried Apricots (50g),M&S,Snack,1 Package,2.4,21.7,0.4,3.3,21.7,,0.1,,,75,
M&S Snack - Lightly Sea Salted Popped Chips (23g),M&S,Snack,1 Package,1.7,16.6,1.2,1.4,0.2,,0.1,,,288,
M&S Snack - Red Pepper Pitta Chips (30g),M&S,Snack,1 Package,3.3,19.2,5.2,1.1,1.1,,0.4,,,240,
M&S Snack - Baked Sesame Pretzel Thins (40g),M&S,Snack,1 Package,4.4,27.4,5.2,1.4,2.6,,0.5,,,600,
M&S Snack - Wasabi Peas (50g),M&S,Snack,1 Package,6.9,29.6,4.8,5.6,5.4,,1.6,,,925,
M&S Snack - Cheese and Bacon Egg Bites (156g),M&S,Snack,1 Package,22.6,5.6,18.7,0.8,0.9,,7.3,,,1685,
M&S Snack - Salt and Vinegar Chiplets (30g),M&S,Snack,1 Package,1.9,18.2,6.2,1.1,0.5,,2.8,,,840,
M&S Snack - Iced Spiced Soft Bun (85g),M&S,Snack,1 Package,4.2,52.1,4.6,1.9,30.6,,2.0,,,112,
M&S Snack - Chilli and Coriander King Prawns (130g),M&S,Snack,1 Package,14.2,4.8,3.2,3.2,0.1,,0.5,,,390,
M&S Snack - Pineapple Melon and Grapes (130g),M&S,Snack,1 Package,0.8,12.1,0.1,2.0,12.1,,0.1,,,5,
M&S Snack - Carrot Cake with Walnuts (75g),M&S,Snack,1 Package,3.2,37.5,12.1,0.6,23.0,,3.1,,,165,
M&S Snack - Reduced Fat Salt and Vinegar Crisps (40g),M&S,Snack,1 Package,2.7,25.2,7.7,1.9,0.7,,0.8,,,172,
M&S Snack - Bircher Muesli (190g),M&S,Snack,1 Package,8.7,38.8,15.6,4.4,27.5,,7.6,,,98,
M&S Snack - Salted Caramel Rice Cakes (38g),M&S,Snack,1 Package,2.6,25.4,7.4,0.9,16.4,,4.3,,,114,
M&S Snack - Reduced Fat Ready Salted Crisps (40g),M&S,Snack,1 Package,2.9,26.3,7.5,1.4,0.2,,0.6,,,152,
M&S Snack - Egg and Spinach Snack Pot (100g),M&S,Snack,1 Package,12.2,2.4,7.9,0.5,0.1,,2.8,,,180,
M&S Snack - Marinated King Prawns (110g),M&S,Snack,1 Package,15.6,10.7,2.4,0.1,10.3,,0.4,,,409,`;

function parseCSV(csv: string): FoodItem[] {
  const lines = csv.trim().split('\n');
  const items: FoodItem[] = [];
  const seenNames = new Set<string>();
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    const name = values[0];
    
    // Skip duplicates
    if (seenNames.has(name)) {
      continue;
    }
    seenNames.add(name);
    
    const protein = parseFloat(values[4]) || 0;
    const carbs = parseFloat(values[5]) || 0;
    const fat = parseFloat(values[6]) || 0;
    
    items.push({
      name: values[0],
      supermarket: values[1],
      category: values[2],
      amountPer: values[3],
      protein,
      carbs,
      fat,
      fiber: parseFloat(values[7]) || 0,
      sugar: parseFloat(values[8]) || 0,
      cholesterol: parseFloat(values[9]) || 0,
      saturatedFat: parseFloat(values[10]) || 0,
      calcium: parseFloat(values[11]) || 0,
      iron: parseFloat(values[12]) || 0,
      sodium: parseFloat(values[13]) || 0,
      magnesium: parseFloat(values[14]) || 0,
      calories: calculateCalories(protein, carbs, fat),
    });
  }
  
  return items;
}

export const foodData = parseCSV(rawData);
export const supermarkets = [...new Set(foodData.map(item => item.supermarket))];
export const categories = [...new Set(foodData.map(item => item.category))];

export function getSandwiches(supermarket: string): FoodItem[] {
  return foodData.filter(item => 
    item.supermarket === supermarket && item.category === 'Sandwich'
  );
}

export function getSnacks(supermarket: string): FoodItem[] {
  return foodData.filter(item => 
    item.supermarket === supermarket && item.category === 'Snack'
  );
}

export function getFoodsByCategory(category: string, supermarket?: string): FoodItem[] {
  return foodData.filter(item => 
    item.category === category && 
    (supermarket ? item.supermarket === supermarket : true)
  );
}
