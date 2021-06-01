import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BoardService } from './../../services/board.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upgrade-board',
  templateUrl: './upgrade-board.component.html',
  styleUrls: ['./upgrade-board.component.scss']
})
export class UpgradeBoardComponent implements OnInit {
  plans = [
    {
      name: 'free', amount: 0, desc: `
    A Free Firacard is <b>FREE</b> and allows up to 15 contributions. It works great if you have a small number of contributors,
    want to create a 1-to-1 board between you and the recipient,
    or would like to trial the system. You can <b>start with a Free board and upgrade later</b>.,
    `, details: `Up to 10 board posts| Add text, pics, GIFs, videos | Desktop & mobile friendly | Accessible forever|
    No advertisements | Deliver online or print as poster`,
  },
  {
    name: 'premium', amount: 12, desc: `
    A Premium Firacard allows 100 contributions on a single board for a <b>one-time charge of $3.99.</b> It's perfect for larger groups on birthdays, work anniversaries,
    and other special occasions! You can start with a Premium board and upgrade later.,
  `, details: `Up to 100 board posts | Add text, pics, GIFs, videos | Desktop & mobile friendly | Accessible forever|
  No advertisements | Deliver online or print as poster`,
  },
  {
    name: 'enterprise', amount: 24, desc: `
    A Enterprise Kudoboard allows unlimited contributions on a single board for a one-time charge of $13.99.
    It's built for extra-large groups and those planning to display the board as a slideshow.,
  `, details: `Unlimited board posts | Add text, pics, GIFs | videos, Desktop & mobile friendly | Accessible forever |
  No advertisements | Deliver online or print as poster | Play as slideshow`,
  }
  ];
  planList: any;
  faqs = [
    {title: 'What is FiraCard and how does it work?', desc: `Eget aliquet hendrerit purus metus velit sollicitudin.
    Consectetur arcu sed elementum quis fermentum fames a. Tincidunt non amet duis pellentesque vestibulum vitae.`},
    {title: 'What are the most common uses for FiraCard', desc: `Eget aliquet hendrerit purus metus velit sollicitudin.
    Consectetur arcu sed elementum quis fermentum fames a. Tincidunt non amet duis pellentesque vestibulum vitae.`},
    {title: 'Is there a limit to the number of contributions?', desc: `Eget aliquet hendrerit purus metus velit sollicitudin.
    Consectetur arcu sed elementum quis fermentum fames a. Tincidunt non amet duis pellentesque vestibulum vitae.`},
    {title: 'Do contributors have to register?', desc: `Eget aliquet hendrerit purus metus velit sollicitudin.
    Consectetur arcu sed elementum quis fermentum fames a. Tincidunt non amet duis pellentesque vestibulum vitae.`},
    {title: 'How do billing and cancellation work with the Premium Package subscription?', desc: `Eget aliquet hendrerit purus metus velit sollicitudin.
    Consectetur arcu sed elementum quis fermentum fames a. Tincidunt non amet duis pellentesque vestibulum vitae.`}
  ];
  selectedPlan = 'premium';
  stripeWin: any;
  card: any;
  loading = false;
  cardError = false;
  boardId: string;
  constructor(
    private boarsSrv: BoardService,
    private toastr: ToastrService,
    private router: Router,
    route: ActivatedRoute
    ) {
      this.boardId = route.snapshot.params.id;
      console.log(this.boardId);
    }

  ngOnInit(): void {
    this.stripeWin = (window as any).Stripe;
    this.getBoardTypes();
  }

  get SelectedPlanDetail(): any {
    if (!this.planList) {return {}; }
    return this.planList.find((plan: any) => plan.boardTypeName === this.selectedPlan);
  }
  getPlanDetails(details: string): any {
    if (!details) { return; }
    return details.split('|');
  }
  checkout(): void {
    const purchase = {boardTypeId: this.SelectedPlanDetail._id, boardId: this.boardId};
    this.loading = true;
    this.boarsSrv.getStripeClientSecret({...purchase}).subscribe(data => {
      this.payWithCard((window as any).Stripe, this.card, data.payload.clientSecret);
    }, err => {
      console.log(err);
      this.toastr.error('Stripe checkout error');
      this.loading = false;
    });
  }
  initStrpe(): void {
    if (!this.stripeWin) {return; }
    this.stripeWin = this.stripeWin(environment.stripePublicKey);
    const elements = this.stripeWin.elements();
    const style = {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#32325d'
        }
      },
      invalid: {
        fontFamily: 'Arial, sans-serif',
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };
    this.card = elements.create('card', { style });
    this.card.mount('#card-element');
  }
  payWithCard = (stripe: any, card: any, clientSecret: any) => {
    this.stripeWin.confirmCardPayment(clientSecret, {payment_method: {card}})
      .then((result: any) => {
        console.log(result);
        if (result.error) {
          // Show error to your customer
          this.toastr.error(result.error.message);
          // showError(result.error.message);
        } else {
          this.toastr.success('Board upgrade successful');
          this.router.navigate(['/boards', this.boardId]);
          // The payment succeeded!
          // orderComplete(result.paymentIntent.id);
        }
      }).finally(() => {
        this.loading = false;
      });
  }
  getBoardTypes(): void {
    this.boarsSrv.getBoardTypes().subscribe(res => {
      this.planList = res.payload;
      setTimeout(() => {
        this.initStrpe();
      }, 1000);
    });
  }

}
