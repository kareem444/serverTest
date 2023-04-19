import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/user/users.module';
import { AuthModule } from './users/auth/auth.module';
import { ProductsModule } from './products/products.module';
import { PaymentsModule } from './payments/payments.module';
import { OrdersModule } from './orders/orders.module';
import { ContactsModule } from './contacts/contacts.module';
import { CommentsModule } from './comments/comments.module';
import { RatesModule } from './rates/rates.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    AuthModule,
    UsersModule,
    ProductsModule,
    CommentsModule,
    RatesModule,
    OrdersModule,
    PaymentsModule,
    ContactsModule,
  ],
})
export class AppModule { }
