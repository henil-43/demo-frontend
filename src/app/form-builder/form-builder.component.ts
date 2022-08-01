import { Component, OnInit, Sanitizer } from '@angular/core';
import { CdkDragDrop, moveItemInArray, copyArrayItem} from '@angular/cdk/drag-drop'
import { cloneDeep } from 'lodash';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit {

  popup: any
  isVisible: Boolean = false

  htmlItems:any = [
    {name: 'label', type: 'label', inputType: 'label', displayText: "sample"},
    {name: 'text', type: 'input text', inputType: 'text', placeholder: '', value:''},
    {name: 'textarea', rows: '', cols:'', displayText: '', placeholder:''},
    {name: 'checkbox', type: 'input-check', inputType: 'checkbox', placeholder: '', displayText: ""},
    {name: 'radio', type: 'input-check', inputType: 'radio', displayText: "", value: ''},
    {name: 'button', type: '', displayText: ""},

  ]
  htmlText: any
  droppedItems: any = []
  test: string = ''
  currentDraggedItem: any
  constructor(private santitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.popup = {}
  }

  onSubmit(name: any){
    this.isVisible = false
    let temp = this.currentDraggedItem.previousContainer.data[this.currentDraggedItem.previousIndex].name 
    if(temp == 'label'){
      this.currentDraggedItem.previousContainer.data[this.currentDraggedItem.previousIndex].displayText = name.value.name

    }
    else if(temp == 'text'){
      this.currentDraggedItem.previousContainer.data[this.currentDraggedItem.previousIndex].placeholder = name.value.placeholder
    }
    else if(temp == 'checkbox'){
      this.currentDraggedItem.previousContainer.data[this.currentDraggedItem.previousIndex].displayText = name.value.name
      this.currentDraggedItem.previousContainer.data[this.currentDraggedItem.previousIndex].placeholder = name.value.placeholder
    }
    else if(temp == 'radio'){
      this.currentDraggedItem.previousContainer.data[this.currentDraggedItem.previousIndex].displayText = name.value.name
      this.currentDraggedItem.previousContainer.data[this.currentDraggedItem.previousIndex].value = name.value.value
    }
    else if(temp == 'button'){
      this.currentDraggedItem.previousContainer.data[this.currentDraggedItem.previousIndex].displayText = name.value.name
      this.currentDraggedItem.previousContainer.data[this.currentDraggedItem.previousIndex].type = name.value.type
    }
    else if(temp == 'textarea'){
      this.currentDraggedItem.previousContainer.data[this.currentDraggedItem.previousIndex].displayText = name.value.name
      this.currentDraggedItem.previousContainer.data[this.currentDraggedItem.previousIndex].placeholder = name.value.placeholder
      this.currentDraggedItem.previousContainer.data[this.currentDraggedItem.previousIndex].rows = name.value.rows
      this.currentDraggedItem.previousContainer.data[this.currentDraggedItem.previousIndex].cols = name.value.columns
      
      
    }
    
    // copyArrayItem(
    //   this.currentDraggedItem.previousContainer.data,
    //   this.currentDraggedItem.container.data,
    //   this.currentDraggedItem.previousIndex,
    //   this.currentDraggedItem.currentIndex
    // );

    const clone = cloneDeep(this.currentDraggedItem.previousContainer.data[this.currentDraggedItem.previousIndex])
    this.currentDraggedItem.container.data.splice(this.currentDraggedItem.currentIndex, 0, clone)

    this.currentDraggedItem = {}
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
      this.currentDraggedItem = {...event}
      console.log(event)
  }
  }

  generateHTMLCode():any{
    
    this.htmlText = "<form><div>"
    console.log(this.droppedItems)
    for (let i=0;i<this.droppedItems.length;i++){
      if(this.droppedItems[i].name == 'label'){
        this.htmlText += `<label>${this.droppedItems[i].displayText}</label>`
      }
      else if(this.droppedItems[i].name != 'label' && this.droppedItems[i].name != 'button' && this.droppedItems[i].name != 'textarea'){ 
        this.htmlText += `<input type="${this.droppedItems[i].inputType}"` 
         if(this.droppedItems[i].placeholder){
          this.htmlText += `[placeholder]="${this.droppedItems[i].placeholder}"` 
         }
        if(this.droppedItems[i].displayText){
          this.htmlText += `[name]="${this.droppedItems[i].displayText}"`
        }
        if(this.droppedItems[i].value){
          this.htmlText += `[value]="${this.droppedItems[i].value}"`
        }
        this.htmlText += ">"
      }
      else if(this.droppedItems[i].name == 'button'){
            
        this.htmlText += `<button type="${this.droppedItems[i].type}">${this.droppedItems[i].displayText}</button>`
      }
      else if(this.droppedItems[i].name == 'textarea'){
            
        this.htmlText += `<textarea rows="${this.droppedItems[i].rows}" cols="${this.droppedItems[i].cols}" name="${this.droppedItems[i].displayText}">${this.droppedItems[i].placeholder}</textarea>`
      }
    }
  
    this.htmlText += "</form></div>"

  }
}