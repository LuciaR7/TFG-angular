import { NgModule } from '@angular/core';
import { UserComponent } from './components/user/user.component';
import { SharedModule } from '../shared/shared.module';
import { ClienteRoutingModule } from './cliente.routing.module';



@NgModule({
    declarations: [
        UserComponent
    ],
    imports: [
        SharedModule,
        ClienteRoutingModule
    ],
    exports: [
        UserComponent,
    ]
})

export class ClienteModule { }
