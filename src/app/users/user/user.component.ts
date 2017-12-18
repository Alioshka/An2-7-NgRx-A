import { Component, Input, Output, EventEmitter } from '@angular/core';

import { User } from './../../models/user';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  @Input() user: User;
  @Output() onDelete = new EventEmitter<User>();
  @Output() onEdit = new EventEmitter<User>();

  editUser() {
    this.onEdit.emit(this.user);
  }

  deleteUser() {
    this.onDelete.emit(this.user);
  }

}
