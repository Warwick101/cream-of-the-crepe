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
        { title: "Halima Special", description: "Egg blended mozzarella, swiss & feta cheese", price: 11.5 },
        { title: "Breakfast Burrito", description: "Your choice turkey or sliced roast beef with onions, green peppers, egg & cheddar", price: 13.5 },
      ]
    },
    {
      category: "Chicken Florentine",
      img:'../../assets/img/chicken-florentine--thumb.png',
      type: "savory",
      categoryId: "savoryCrepe",
      caption: "Add an egg to any menu item $.75",
      items: [
        { title: "Rise and Shine", description: "Eggs, turkey bacon & your choice of cheese (mozzarella, swiss or cheddar)",
          price: 12.95
        },
        { title: "Greekfast", description: "Eggs, feta cheese, spinach & tomatoes", price: 11.95 },
        { title: "Halima Special", description: "Egg blended mozzarella, swiss & feta cheese", price: 11.5 },
        { title: "Breakfast Burrito", description: "Your choice turkey or sliced roast beef with onions, green peppers, egg & cheddar", price: 13.5 },
      ]
    },
    {
      category: "Sweet Crêpes",
      categoryId: "sweetCrepe",
      img:'../../assets/img/sweet-crepe--thumb.png',
      type: "sweet",
      caption: "Add one scoop of ice cream for $x.x",
      items: [
        { title: "Sweetheart", description: "Fresh strawberries & Nutella spread", price: "N/A" }, // No price provided
        { title: "Funky Monkey", description: "Fresh bananas & Nutella hazelnut spread", price: 10.95},
        { title: "Totally Nutty", description: "Peanut butter with Nutella spread or fruit preserves", price: 10.5 },
        { title: "Crazy for Chocolate", description: "Chocolate crepe, chocolate sauce, chocolate rice krispies & raspberry sauce", price: 10.5 },
      ]
    },
    {
      category: "French Takos",
      categoryId: "frenchTako",
      img:'../../assets/img/french-takos--thumb.png',
      type: "savory",
      items: [
        { title: "Paris Original Takos",
          description: "Marinated chicken, fries, caramelized onion homemade french cheese sauce", price: 13.5 },
        { title: "Cordon Blue Takos",
          description: "Crispy chicken tenders swiss cheese, fries,homemade french cheese sauce", price: 13.5 },
        { title: "Marrakeeh Takos",
          description: "Ground beef kafta, fries, cheddar cheese, homemade french cheese sauce", price: 13.5,
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
          description: "Turkey bacon, eggs, avocado & your choice of cheese", price: 13.5 },
        { title: "Chicken Pesto Panini",
          description: "Chicken breast, grilled onions & sun-dried tomatoes cheese", price: 13.5 },
        { title: "Barbecue Chicken Panini",
          description: "Grilled chicken, red onion, tomatoes, swiss cheese", price: 13.5},
        { title: "Turkey Panini",
          description: "Sliced turkey breast, swiss cheese, avocado, tomatoes, fresh basil & mayo", price: 13.5},
        { title: "Gyros Panini",
          description: "Gyros, caramelized onions, tomatoes, mozzarella & Tzatziki sauce", price: 13.5},
        { title: "Philly Cheese Panini",
          description: "Sliced roast beef, mushrooms, caramelized onions & mozzarella", price: 13.5},
        { title: "Smoked Salmon Panini",
          description: "Smoked salmon, red onion, capers, dill cream cheese", price: 13.5},
        { title: "Tuna Melt Panini",
          description: "Tuna Salad, red onions & cheddar cheese", price: 13.5},
        { title: "Shrimp Panini Panini",
          description: "Shrimp, avocado, sun-dried tomatoes, fresh basil, feta cheese", price: 13.5},
        { title: "Veggie Panini",
          description: "Mushrooms, green peppers, onions, spinach, tomatoes, mozzarella", price: 13.5},
        { title: "Caprese Panini",
          description: "Mozzarella, roma tomatoes, pesto sauce & fresh basil", price: 13.5},
        { title: "Grilled Cheese Panini",
          description: "American cheese & butter", price: 13.5,
        },
      ]
    },
    {
      category: "Drinks",
      categoryId: "drinks",
      img:'../../assets/img/drinks.jpg',
      type: "sweet",
      items: [
        { title: "Coffee (Regular or decaf)", description: "", price: 3.25 },
        { title: "Espresso", description: "", price: 3.25},
        { title: "Americano", description: "", price: 3.5}
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
        { title: "Amand Croissant", description: "", price: 4.5}
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

  @Input() linkInfo: any[] = [
    {
    linkTargetId: 'test',
      linkLabel: 'ddfd',
      linkActive: false
  }
  ];

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
