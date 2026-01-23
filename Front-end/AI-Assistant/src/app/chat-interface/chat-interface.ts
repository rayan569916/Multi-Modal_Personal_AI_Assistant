import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-interface',
  imports: [CommonModule],
  templateUrl: './chat-interface.html',
  styleUrl: './chat-interface.css',
})
export class ChatInterfaceComponent implements OnInit {
  ngOnInit() {
    // this.showCard();
  }

  showCard: boolean = false;
  borderRadius="rounded-full items-center";
  allignItems="";

  showCardMethod() {
    this.showCard = !this.showCard;
  }

  autoGrow(textarea: HTMLTextAreaElement) {
    textarea.style.height = 'auto';

    const maxHeight = 300; 

    if (textarea.scrollHeight <= maxHeight) {
      textarea.style.overflowY = 'hidden';
      textarea.style.height = textarea.scrollHeight + 'px';
      this.borderRadius="rounded-lg items-end";
    }
    else if (textarea.scrollHeight >= maxHeight) {
      textarea.style.overflowY = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
      this.borderRadius="rounded-lg items-end";
    }
    else {
      textarea.style.overflowY = 'auto';
    }
  }

}
