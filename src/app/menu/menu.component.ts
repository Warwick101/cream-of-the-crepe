import {Component, ElementRef, Input, OnInit, QueryList, ViewChildren} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {


  menuData = [
    {
      category: "Savory Crêpes",
      img:'../../assets/img/savory-crepe--thumb.png',
      type: "savory",
      categoryId: "savoryCrepe",
      caption: "Add an egg to any menu item $.75",
      items: [
        { title: "Rise and Shine", description: "Eggs, turkey bacon & your choice of cheese (mozzarella, swiss or cheddar)",
          price: 12.95
        },
        { title: "Greekfast", description: "Eggs, feta cheese, spinach & tomatoes", price: 11.95 },
        { title: "Halima Special", description: "Egg blended mozzarella, swiss & feta cheese", price: 11.50 },
        { title: "Breakfast Burrito", description: "Your choice turkey or sliced roast beef with onions, green peppers, egg & cheddar", price: 13.50 },
        { title: "Netropolis", description: "Spinach, feta cheese, tomatoes, walnuts & balsamic vinaigrette", price: 11.95 },
        { title: "Vegetarian", description: "Mushrooms, green peppers, onions, spinach, tomatoes & mozzarella", price: 12.95 },
        { title: "Chicken Florentine", description: "Chicken breast, spinach, mushrooms, mozzarella & béchamel sauce", price: 13.50 },
        { title: "Santa Fe Chicken", description: "Chicken breast, green peppers, avocado & cheddar", price: 13.50 },
        { title: "Moroccan Sweet Chicken", description: "Chicken breast, almonds, eggs, caramelized sweet onions & golden raisins topped with powdered sugar & cinnamon", price: 13.50 },
        { title: "Pesto Chicken", description: "Chicken breast, mushrooms, sun-dried tomatoes, pesto sauce & mozzarella", price: 13.50 },
        { title: "Tasty Turkey", description: "Sliced turkey breast, swiss, avocado, tomatoes & mozzarella", price: 13.50 },
        { title: "Gyros Crêpe", description: "Gyros, caramelized onions, tomatoes, lettuce, mozzarella & Tzatziki sauce", price: 13.50 },
        { title: "Atlantic", description: "Smoked salmon, dill cream cheese & tomatoes", price: 14.50 },
        { title: "Shrimp Charmula", description: "Shrimp, mushrooms & homemade tomato sauce", price: 13.95 },
        { title: "Parisian Salmon", description: "Oven baked salmon, mushrooms, capers & hollandaise sauce", price: 14.95 },
      ]
    },
    {
      category: "Sweet Crêpes",
      categoryId: "sweetCrepe",
      img:'../../assets/img/sweet-crepe--thumb.png',
      type: "sweet",
      caption: "Gluten Free 2.00",
      items: [
        { title: "Sweetheart", description: "Fresh strawberries & Nutella spread", price: 10.95 },
        { title: "Funky Monkey", description: "Fresh bananas & Nutella hazelnut spread", price: 10.50},
        { title: "Totally Nutty", description: "Peanut butter with Nutella spread or fruit preserves", price: 10.50 },
        { title: "Crazy for Chocolate", description: "Chocolate crepe, chocolate sauce, chocolate rice krispies & raspberry sauce", price: 10.75 },
        { title: "S'Mores", description: "Marshmallows, graham crackers & chocolate sauce", price: 10.50 },
        { title: "Pie Me to the Moon", description: "Homemade apple pie filling, graham crackers & caramel sauce", price: 10.95 },
        { title: "Turtle", description: "Chocolate sauce, caramel & walnuts", price: 10.50 },
        { title: "Tropical Fruit Tart", description: "Fresh bananas, strawberries, peaches, pineapple, kiwi, roasted almonds & fruit glaze", price: 11.25 },
        { title: "Banana Berry", description: "Fresh strawberries, bananas & blueberry sauce", price: 10.75 },
        { title: "Mixed Berry", description: "Raspberries, blackberries, blueberries & strawberries", price: 10.75 },
        { title: "Crêpe Suzette", description: "Mandarin oranges glazed with honey & walnuts", price: 10.50 },
        { title: "Blueberry or Raspberry Cheese Crêpe", description: "Your choice of blueberry or raspberry sweet cheese & graham crackers with berry sauce", price: 10.75 },
        { title: "Cherry Forest", description: "Cherries, roasted almonds & chocolate flakes", price: 10.75 },
        { title: "Banana Pudding", description: "Fresh bananas, banana pudding, wafers & raspberry sauce", price: 10.95 },
        { title: "Chocolate Pudding", description: "Chocolate crêpe with chocolate pudding & chocolate chips", price: 10.95 },
        { title: "Plain Jane", description: "Butter & powder sugar. Add lemon juice, honey, caramel sauce, chocolate or maple syrup", price: 8.95 },
        { title: "Nutella Crêpe", description: "Nutella Spread", price: 9.25 },
      ]
    },
    {
      category: "French Takos",
      categoryId: "frenchTako",
      img:'../../assets/img/french-takos--thumb.png',
      caption: "Add two eggs to any Takos for 3.00",
      type: "savory",
      items: [
        { title: "Paris Original Takos",
          description: "Marinated chicken, fries, caramelized onion homemade french cheese sauce", price: 13.50 },
        { title: "Cordon Blue Takos",
          description: "Crispy chicken tenders swiss cheese, fries,homemade french cheese sauce", price: 13.50 },
        { title: "Marrakeeh Takos",
          description: "Ground beef kafta, fries, cheddar cheese, homemade french cheese sauce", price: 13.50,
        },
        { title: "Trois Meat Takos",
          description: "Marinated chicken, ground beef, chicken tenders, fries, cheddar cheese, homemade french cheese sauce", price: 14.50,
        },
        { title: "Roasted Veggies Takos",
          description: "Onion, pepper, mushrooms, sundried tomato, avocado, mozzarella cheese, fries, homemade french cheese sauce.", price: 13.50,
        },
        { title: "Le Matin Takos",
          description: "Sliced turkey breast, caramelized onion, mushroom, eggs, Swiss cheese, fries, homemade french cheese sauce.", price: 13.50,
        },
      ]
    },
    {
      category: "Paninis",
      categoryId: "Paninis",
      caption: "Served with chips / Add two eggs 3.00",
      img:'../../assets/img/paninis--thumb.png',
      type: "savory",
      items: [
        { title: "Morning Panini",
          description: "Turkey bacon, eggs, avocado & your choice of cheese", price: 13.50 },
        { title: "Chicken Pesto Panini",
          description: "Chicken breast, grilled onions & sun-dried tomatoes cheese", price: 13.50 },
        { title: "Barbecue Chicken Panini",
          description: "Grilled chicken, red onion, tomatoes, swiss cheese", price: 13.50},
        { title: "Turkey Panini",
          description: "Sliced turkey breast, swiss cheese, avocado, tomatoes, fresh basil & mayo", price: 13.50},
        { title: "Gyros Panini",
          description: "Gyros, caramelized onions, tomatoes, mozzarella & Tzatziki sauce", price: 13.50},
        { title: "Philly Cheese Panini",
          description: "Sliced roast beef, mushrooms, caramelized onions & mozzarella", price: 13.50},
        { title: "Smoked Salmon Panini",
          description: "Smoked salmon, red onion, capers, dill cream cheese", price: 13.50},
        { title: "Tuna Melt Panini",
          description: "Tuna Salad, red onions & cheddar cheese", price: 13.50},
        { title: "Shrimp Panini Panini",
          description: "Shrimp, avocado, sun-dried tomatoes, fresh basil, feta cheese", price: 13.50},
        { title: "Veggie Panini",
          description: "Mushrooms, green peppers, onions, spinach, tomatoes, mozzarella", price: 13.50},
        { title: "Caprese Panini",
          description: "Mozzarella, roma tomatoes, pesto sauce & fresh basil", price: 12.50},
        { title: "Grilled Cheese Panini",
          description: "American cheese & butter", price: 11.50,
        },
      ]
    },
    {
      category: "Drinks",
      categoryId: "drinks",
      caption: "Substitute Soy or Almond milk 0.75. Add flavor shot 0.50",
      img:'../../assets/img/drinks.jpg',
      type: "sweet",
      items: [
        { title: "Coffee", description: "(Regular or decaf)", price: 3.25 },
        { title: "Espresso", description: "", price: 3.25},
        { title: "Americano", description: "", price: 3.50},
        { title: "Caffe au lait", description: "", price: 4.25},
        { title: "Caffe Macchiato", description: "", price: 3.95},
        { title: "Cappuccino", description: "", price: 4.25},
        { title: "Latte", description: "hot or iced", price: 4.25},
        { title: "Mocha", description: "", price: 4.50},
        { title: "Hot Chocolate", description: "", price: 3.50},
        { title: "Tea", description: "(hot or iced)", price: 3.50},
        { title: "Frappe", description: "(hot or iced), Assorted flavors", price: 4.50},
        { title: "Smoothie", description: "", price: 4.50},
        { title: "Freshly Squeezed Orange Juice", description: "", price: 4.50}
      ]
    },
    {
      category: "Pastries & Desserts",
      img:'../../assets/img/pasteries.jpg',
      categoryId: "dessert",
      type: "sweet",
      items: [
        { title: "Croissant", description: "", price: 3.25 },
        { title: "Chocolate Croissant", description: "", price: 3.95 },
        { title: "Amand Croissant", description: "", price: 4.50},
        { title: "French Pastries", description: "", price: 4.25},
        { title: "Créme Brulée ", description: "", price: 4.25}
      ]
    },
    {
      category: "Gelato",
      img:'../../assets/img/gelato.jpg',
      categoryId: "gelato",
      type: "sweet",
      items: [
        { title: "One Scoop", description: "Mixed, Berry, Vanilla, Chocolate, Coconut Almonds..", price: 3}]
    }
  ];


  @Input() link: string = '';

  @Input() linkLabel: string = '';

  options: ScrollToOptions = {};

  @Input() behaviour: ScrollBehavior = 'auto';



  // @Input() top ?: any;

  @Input() targetId: string = '';

  @Input() linkInfo: any[] = [];

  @ViewChildren('jumplink') jumpLinks: QueryList<ElementRef<HTMLAnchorElement>> = new QueryList<ElementRef<HTMLAnchorElement>>();

  private observer!: IntersectionObserver;

  activeLink: string = '';

  constructor() {
    // this.observer = new IntersectionObserver();
  }

  ngOnInit(): void {

    const targetIds: string[] = [];

    this.linkInfo.forEach(img => {
      targetIds.push(img.linkTargetId);
    });


    const selectors: string[] = targetIds.map((id) => '#' + id);
    const elementsById: string = selectors.join(' , ');
    const images = document.querySelectorAll(elementsById);

    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          const dataId = entry.target.id;
          const targetLink = this.linkInfo.find((l) => l.linkTargetId === dataId);

          if (dataId === targetLink.linkTargetId) {
            this.activeLink = dataId;
          }
        } else {
          const currentIndex = targetIds.indexOf(entry.target.id);
          if (currentIndex < selectors.length - 1) {
            const nextTargetId = selectors[currentIndex + 1];
            if (document.querySelector(nextTargetId) !== null) {
              this.observer.observe(document.querySelector(nextTargetId)!);
            }
          }
        }
      });
    },{rootMargin: '20% 0px 0px',  threshold: [1]});


    images.forEach(target => {
      const element = document.querySelector(selectors[0]);
      if (element !== null) {
        this.observer.observe(element);
      }
    });

  }

  jumpToArticle(targetId: string) {
    console.log(targetId, 'targetId')
    const view = document.getElementById(targetId);
    console.log(view, 'view')

    this.options.behavior = this.behaviour;
    if (view) {
      view.scrollIntoView(this.options);
      this.activeLink = targetId;
    }
  }
}
