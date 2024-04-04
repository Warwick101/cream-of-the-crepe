import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {

  items = ['one', 'two', 'three'];
  hi = ['one', 'two', 'three'];

  menuData = [
    {
      category: "Savory Crêpes",
      type: "savory",
      caption: "Add an egg to any menu item $.75",
      items: [
        { title: "Rise and Shine", description: "Eggs, turkey bacon & your choice of cheese (mozzarella, swiss or cheddar)",
          price: 12.95,
          img:'../../assets/img/food-item.png'
        },
        { title: "Greekfast", description: "Eggs, feta cheese, spinach & tomatoes", price: 11.95 },
        { title: "Halima Special", description: "Egg blended mozzarella, swiss & feta cheese", price: 11.5 },
        { title: "Breakfast Burrito", description: "Your choice turkey or sliced roast beef with onions, green peppers, egg & cheddar", price: 13.5 },
        // Add more items as needed
      ]
    },
    {
      category: "Sweet Crêpes",
      type: "sweet",
      caption: "Add one scoop of ice cream for $x.x",
      items: [
        { title: "Sweetheart", description: "Fresh strawberries & Nutella spread", price: "N/A" }, // No price provided
        { title: "Funky Monkey", description: "Fresh bananas & Nutella hazelnut spread", price: 10.95,
          img:'../../assets/img/food-item-sweet.png'
        },
        { title: "Totally Nutty", description: "Peanut butter with Nutella spread or fruit preserves", price: 10.5 },
        { title: "Crazy for Chocolate", description: "Chocolate crepe, chocolate sauce, chocolate rice krispies & raspberry sauce", price: 10.5 },
        // Add more items as needed
      ]
    },
    {
      category: "French Takos",
      type: "savory",
      items: [
        { title: "Paris Original Takos", description: "Marinated chicken, fries, caramelized onion homemade french cheese sauce", price: 13.5 },
        { title: "Cordon Blue Takos", description: "Crispy chicken tenders swiss cheese, fries,homemade french cheese sauce", price: 13.5 },
        { title: "Marrakeeh Takos", description: "Ground beef kafta, fries, cheddar cheese, homemade french cheese sauce", price: 13.5,
          img:'../../assets/img/food-item.png'
        },
        // Add more items as needed
      ]
    },
    {
      category: "Drinks",
      type: "sweet",
      items: [
        { title: "Coffee (Regular or decaf)", description: "", price: 3.25 },
        { title: "Espresso", description: "", price: 3.25,
          img:'../../assets/img/food-item-sweet.png'
        },
        { title: "Americano", description: "", price: 3.5,
          img:'../../assets/img/food-item.png'},
        // Add more items as needed
      ]
    },
    {
      category: "Pastries & Desserts",
      type: "sweet",
      items: [
        { title: "Croissant", description: "", price: 3.25 },
        { title: "Chocolate Croissant", description: "", price: 3.95 },
        { title: "Amand Croissant", description: "", price: 4.5,
          img:'../../assets/img/food-item.png'},
        // Add more items as needed
      ]
    },
    {
      category: "Gelatop",
      type: "sweet",
      items: [
        { title: "One Scoop", description: "Mixed, Berry, Vanilla, Chocolate, Coconut Almonds..", price: 3,
          img:'../../assets/img/food-item.png'},
      ]
    }
  ];

  ngOnInit(): void {


    // Example of accessing menu data
    console.log('logging', this.menuData); // Output: "Savory Cêpes"


  }
}
