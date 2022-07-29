import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, copyArrayItem} from '@angular/cdk/drag-drop'

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit {

  popup: any
  isVisible: Boolean = false
  nextFun = false

  htmlItems:any = [
    {name: 'label', type: 'label', inputType: 'label', displayText: "sample"},
    {name: 'text', type: 'input text', inputType: 'text', placeholder: ''},
    {name: 'checkbox', type: 'input-check', inputType: 'checkbox', placeholder: '', displayText: ""},
    {name: 'radio', type: 'input-check', inputType: 'radio', displayText: ""},

  ]
  htmlText: any
  droppedItems: any = []
  test: string = ''
  currentDraggedItem: any
  constructor() { }

  ngOnInit(): void {
    this.popup = {}
  }

  onSubmit(name: any){
    this.isVisible = false
    if(this.currentDraggedItem.previousIndex == 0){
      this.currentDraggedItem.previousContainer.data[this.currentDraggedItem.previousIndex].displayText = name.value.name

    }
    else if(this.currentDraggedItem.previousIndex == 1){
      this.currentDraggedItem.previousContainer.data[this.currentDraggedItem.previousIndex].placeholder = name.value.placeholder
    }
    else if(this.currentDraggedItem.previousIndex == 2){
      this.currentDraggedItem.previousContainer.data[this.currentDraggedItem.previousIndex].displayText = name.value.name
      this.currentDraggedItem.previousContainer.data[this.currentDraggedItem.previousIndex].placeholder = name.value.placeholder
    }

    copyArrayItem(
      this.currentDraggedItem.previousContainer.data,
      this.currentDraggedItem.container.data,
      this.currentDraggedItem.previousIndex,
      this.currentDraggedItem.currentIndex
    );
    name.reset()

  }
  drop(event: CdkDragDrop<string[]>){
    console.log(event)
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      // transferArrayItem(
      //   event.previousContainer.data,
      //   event.container.data,
      //   event.previousIndex,
      //   event.currentIndex,
      // );
      this.isVisible = true
      this.currentDraggedItem = event
      console.log(event)
  }
  }
}
