import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Attachment } from './chat-interface.interface';
import { FormsModule } from '@angular/forms';
import { chatInterfaceService } from './chat-interface.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-chat-interface',
  imports: [CommonModule, FormsModule],
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
  chatValue: string = "";

  messages: { text: string, sender: 'user' | 'ai', attachments?: Attachment[] }[] = [];
  isLoading = false;
  modelName = "Microsoft Phi-2"; // From config manually or could fetch
  username = "";

  constructor(private aiService: chatInterfaceService, private authService: AuthService) { }

  ngOnInit() {
    this.username = this.authService.getUsername() || 'User';
  }

  logout() {
    this.authService.logout();
  }

  sendChatMethod() {
    if (!this.chatValue.trim() && this.selectedFiles.length === 0) return;

    const currentMessage = {
      text: this.chatValue,
      sender: 'user' as const,
      attachments: [...this.selectedFiles]
    };
    this.messages.push(currentMessage);

    const formData = new FormData();
    const textmsg = this.chatValue;
    formData.append('text', textmsg);
    this.selectedFiles.forEach((item, index) => {
      formData.append('attachements', item.file)
    })

    this.isLoading = true;
    this.chatValue = "";
    this.selectedFiles = [];
    this.FileSelected = false;
    this.borderRadius = "rounded-full items-center"; // Reset style

    this.aiService.sendChatMethod(formData).subscribe({
      next: (res: any) => {
        this.messages.push({
          text: res.message || "No response",
          sender: 'ai'
        });
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.messages.push({
          text: "Error: Could not get response from server.",
          sender: 'ai'
        });
        this.isLoading = false;
      }
    });
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

  autoGrowForFile() {
    this.borderRadius = "rounded-lg items-end";
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

  removeItem(file: Attachment) {
    this.selectedFiles = this.selectedFiles.filter(f => f != file);
  }

}
