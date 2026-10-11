export type CategoryId = 'starters' | 'tajines' | 'couscous' | 'desserts'

export interface MenuItem {
  name: string
  arabic?: string
  description: string
  price: number // MAD
  vegetarian?: boolean
  signature?: boolean
}

export interface Category {
  id: CategoryId
  label: string
  intro: string
  image: string
  alt: string
  items: MenuItem[]
}

export const categories: Category[] = [
  {
    id: 'starters',
    label: 'Starters',
    intro: 'Small plates to share, served warm with fresh khobz from our wood oven.',
    image: '/images/harira.jpg',
    alt: 'A bowl of harira soup with a lemon wedge on a colourful tablecloth',
    items: [
      { name: 'Harira', arabic: 'حريرة', description: 'Slow-simmered tomato, lentil and chickpea soup, fresh coriander, a squeeze of lemon, dates on the side.', price: 45, signature: true },
      { name: 'Zaalouk', arabic: 'زعلوك', description: 'Smoky aubergine and tomato salad with garlic, cumin and olive oil.', price: 50, vegetarian: true },
      { name: 'Taktouka', description: 'Roasted peppers and tomatoes, cooked down with garlic and paprika.', price: 50, vegetarian: true },
      { name: 'Briouates', description: 'Crisp pastry triangles filled with goat cheese and honey, or spiced prawns.', price: 65 },
      { name: 'Pastilla au poulet', arabic: 'بسطيلة', description: 'Shredded chicken, almonds and cinnamon in warqa pastry, dusted with icing sugar.', price: 85, signature: true },
      { name: 'Salades marocaines', description: 'Six little salads of the day: carrots, beetroot, courgette, tomato, olives and chermoula.', price: 70, vegetarian: true },
    ],
  },
  {
    id: 'tajines',
    label: 'Tajines',
    intro: 'Cooked for hours in glazed clay over charcoal. Each tajine comes with bread and olives.',
    image: '/images/tagine-clay.jpg',
    alt: 'A clay tajine of lamb and green olives on a white tablecloth',
    items: [
      { name: 'Lamb, prunes and almonds', arabic: 'لحم بالبرقوق', description: 'Shoulder of lamb in a honeyed onion sauce, toasted almonds and sesame.', price: 165, signature: true },
      { name: 'Chicken, preserved lemon and olives', description: 'Free-range chicken, violet olives, house-preserved lemons and saffron.', price: 135, signature: true },
      { name: 'Kefta and eggs', description: 'Spiced lamb meatballs in tomato sauce with two eggs baked on top.', price: 120 },
      { name: 'Fish chermoula', description: 'Catch of the day from Salé, marinated in chermoula with potatoes and peppers.', price: 150 },
      { name: 'Seven-vegetable tajine', description: 'Seasonal vegetables, chickpeas and apricots, ras el hanout.', price: 110, vegetarian: true },
      { name: 'Lamb shank, artichoke and peas', description: 'Fall-off-the-bone shank, young artichokes and green peas in a lemony broth.', price: 180 },
    ],
  },
  {
    id: 'couscous',
    label: 'Couscous',
    intro: 'Hand-rolled semolina, steamed three times. Friday is couscous day, with a family-sized platter for the table.',
    image: '/images/couscous-veg.jpg',
    alt: 'A plate of couscous with carrots, courgette and chicken',
    items: [
      { name: 'Couscous Royal', arabic: 'كسكس', description: 'Lamb, chicken and merguez, seven vegetables, chickpeas and a ladle of broth.', price: 175, signature: true },
      { name: 'Tfaya', description: 'Chicken with caramelised onions, raisins and cinnamon on fine semolina.', price: 145 },
      { name: 'Seven vegetables', description: 'A garden of carrots, turnip, pumpkin, courgette and cabbage in saffron broth.', price: 120, vegetarian: true },
      { name: 'Lamb shoulder', description: 'Slow-braised shoulder, onion confit and chickpeas.', price: 170 },
      { name: 'Seffa medfouna', description: 'Sweet-savoury vermicelli with chicken buried beneath, almonds and cinnamon.', price: 140 },
    ],
  },
  {
    id: 'desserts',
    label: 'Desserts',
    intro: 'Sweet endings made by Lalla Zineb in our pastry corner, always with mint tea.',
    image: '/images/pastries.jpg',
    alt: 'A plate of Moroccan almond pastries and cookies',
    items: [
      { name: 'Orange and cinnamon', description: 'Sliced oranges, orange-blossom water and a dusting of cinnamon.', price: 45, vegetarian: true },
      { name: 'Pastilla au lait', description: 'Layers of crisp pastry with vanilla cream, almonds and rose syrup.', price: 60, vegetarian: true, signature: true },
      { name: 'Chebakia and sellou', arabic: 'شباكية', description: 'Honey-glazed sesame pastries with toasted almond and flour sellou.', price: 55, vegetarian: true },
      { name: 'Gazelle horns', description: 'Almond-paste crescents, orange blossom, served with dates.', price: 55, vegetarian: true },
      { name: 'Mint tea and pastries', description: 'A silver pot of fresh mint tea and a selection of petits fours.', price: 50, vegetarian: true },
    ],
  },
]

export const formatMAD = (n: number) => `${n} MAD`
