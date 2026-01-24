import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Attachment } from './chat-interface.interface';

@Component({
  selector: 'app-chat-interface',
  imports: [CommonModule],
  templateUrl: './chat-interface.html',
  styleUrl: './chat-interface.css',
})


export class ChatInterfaceComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>
  FileSelected: boolean = false;
  selectedFiles: Attachment[] = [];
  showCard: boolean = false;
  borderRadius = "rounded-full items-center";
  allignItems = "";
  ngOnInit() {
    // this.showCard();
  }

  showCardMethod() {
    this.showCard = !this.showCard;
  }

  autoGrow(textarea: HTMLTextAreaElement) {
    textarea.style.height = 'auto';
    const maxHeight = 300;

    if (textarea.scrollHeight <= maxHeight) {
      textarea.style.overflowY = 'hidden';
      textarea.style.height = textarea.scrollHeight + 'px';
      this.autoGrowForFile();
    }
    else if (textarea.scrollHeight >= maxHeight) {
      textarea.style.overflowY = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
      this.autoGrowForFile();
    }
    else {
      textarea.style.overflowY = 'auto';
    }
  }

  autoGrowForFile(){
    this.borderRadius="rounded-lg items-end";
  }

  fileSelecter(type: string) {
    const input = this.fileInput.nativeElement;
    if (type == 'document') {
      input.accept = '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt'
    }
    else if (type == 'image') {
      input.accept = 'image/*';
    }
    input.click();
  }

  onFileSelected(event: Event) {
    const input = this.fileInput.nativeElement;
    if (!input.files || input.files.length == 0) return;
    Array.from(input.files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          this.selectedFiles.push({
            file,
            preview: reader.result as string
          });
          console.log(this.selectedFiles)
        };
        reader.readAsDataURL(file);
      }
      else {
        this.selectedFiles.push({ file });
      }
    });
    this.FileSelected = true;
    this.showCard = false;
    this.autoGrowForFile()
  }

  removeItem(file:Attachment){
    
  }

}
