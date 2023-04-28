import { CheerioWebBaseLoader } from 'langchain/document_loaders';
import { Document } from 'langchain/document';

function wait(time: number) {
  return new Promise<void>(resolve => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

export class SimpleWebLoader extends CheerioWebBaseLoader {
  constructor(webPath: string) {
    super(webPath);
  }

  public async load(): Promise<Document[]> {
    const $ = await this.scrape();
    await wait(5000)
    const node = $("body");
    
    const text = `
We recommend that if you do need to change your flights, you do so as soon as possible. Some airlines do not allow changes within 72 hours of departure.
Note, if you have booked with a Low Cost Airline  , changes can generally be self-serviced via the airline’s website. If changes need to be made on your day of departure, please contact the airline directly for assistance.
If you also need to change your hotel booking, please advise us at the time.
If the above information doesn't resolve your query, please click the 'Contact Support' tab below with your request and our dedicated customer service team   can assist you further! Luxury Escapes offer types Homes & Villas: Homes & Villas are a category of Luxury Escapes holidays offering exclusive escapes catered towards groups and families. They can be found at https://luxuryescapes.com/homes-and-villas.h1 Last Minute Escapes: A category of Luxury Escapes offer for customers wanting to travel within a few weeks.  They offer rates up to 15% off the best available rate Curated with the property to provide an exclusive package for Luxury Escapes customers  Are available only to Australian customers and feature domestic properties. We should not refer to Last Minute Escapes to customers outside of Australia. Last Minute Escapes packages are non-refundable and non-changeable Can be combined with flights, experiences and travel insurance
Limited Time Lux Exclusive: A category of Luxury Escapes offer offering best in market rates and VIP inclusions. These offers are only available for a limited time, usually a couple of weeks. Curated with the property to provide an exclusive package that can not be purchased anywhere else On sale for a limited period of time with set travel periods Customers can lock in dates at the time of purchase or have an open dated “Buy Now, Book Later” deal Booking can be cancelled within 7 days of purchase, no questions asked, for a full refund Some packages can be cancelled after the first 7 days and receive a credit with the Luxury Escapes flexible cancellation policy.  Flexibility to change dates before check in Can be combined with flights, experiences and travel insurance
Lux Premium Collection: A category of Luxury Escapes offer available to book all of the time. Curated with the property to provide an exclusive package On sale all of the time Offer bonus inclusions for longer stays Greater flexibility with cancellation policies. Some packages may be cancelled the day before travel for a full refund depending on the offer's specific terms and conditions. Can be combined with flights, experiences and travel insurance
Lux Partner Property: A category of Luxury Escapes offer available all of the time.  On sale all of the time Generally a range of 4-5 star properties Cancellation and refund policies vary depending on the offer's specific terms and conditions Can be combined with flights, experiences and travel insurance Tours: Luxury Escapes offers a range of different tours products all around the world. These tours are either curated by Luxury Escapes (aka LUX Exclusive Tours or Ultra Lux Tours) or hand picked from one of our trusted touring partners (aka LUX Trusted Partner Tours) A wide range of short and long duration tours. Luxury Escapes are extremely selective of who we partner with for touring. 7 day change of mind cancellation policy – no questions asked. Dedicated Luxury Escapes tours support team.
Cruises: Working with trusted partners, Luxury Escapes offers a broad range of cruising, both domestic and international. Options of cruising remote areas of Australia such as the Kimberley Coast or more familiar regions such as the Pacific islands, Asia or Europe river cruising. 48 hours change of mind cancellation policy– no questions asked. Dedicated Luxury Escapes cruise support team. Ultra Lux: Ultra Lux is a category of exceptional 5&6 star hotels and tours offerings by Luxury Escapes from suppliers such as Mandarin Oriental, One&Only, Atlantis, Six Senses, COMO and many more. Ultra Lux customers receive 24/7 premium concierge support from Luxury Escapes Receive private airport transfers from their home address to the airport Receive many luxury, offer specific inclusions.  Experiences: Many different experiences are offered by Luxury Escapes, including: Live events like sports, concerts or theatre Day tours, guided tours, walking tours etc Dining experiences. Fine dining, food tours, wine country trips and more Adventure activities like hot air ballooning and watersports  Indulgences such as massages, spas, hot springs treatments and other wellness activities And lots more.  Experiences can be browsed by visiting https://luxuryescapes.com/experiences, by adding them during checkout when purchasing a hotel or tour, or via My Escapes after making a hotel or tour purchase.
    `


    await wait(5000)
    const metadata = { source: this.webPath };
    return [new Document({ pageContent: text, metadata })];
  }
}