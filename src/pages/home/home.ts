import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MapPage } from '../map/map';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { StatusBar } from '@ionic-native/status-bar';
export interface Medicine { ScientificName: string,
                            BrandName: string,
                            Address: string,
                            Shopname: string,
                            City: string,
                            // Location: object 
                          }
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  mybrand;
  brands:any[]=[];
  city;
 shops:any[]=[];
 saddress: any[]=[];
  medisCollection: AngularFirestoreCollection<Medicine>;
  medis: Observable<Medicine[]>;
  constructor(public navCtrl: NavController, public afs: AngularFirestore) {
    this.medisCollection = afs.collection<Medicine>('medicines');
    this.medis = this.medisCollection.valueChanges();
  }
status=false;
  checkMedicine()
  {this.status=true;
    //console.log(this.brand);
    this.medisCollection.ref.where("City","==", this.city).where("Brand Name","==", this.mybrand)
  .get()
  .then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
  console.log(doc.data()["Scientific Name"]);
  let  sname = doc.data()["Scientific Name"];
  this.medisCollection.ref.where("City", "==", this.city).where("Scientific Name","==",sname)
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      //console.log(doc.data()["Brand Name"]+":"+doc.data().Shopname+doc.data().Address);
      
      this.shops.push(doc.data().Shopname);
      this.saddress.push(doc.data().Address);
     this.brands.push(doc.data()["Brand Name"]);
       console.log(this.shops)
    })
  }).catch(function(error) {
    console.log("Error getting documents: ", error);
    });
});

})
.catch(function(error) {
console.log("Error getting documents: ", error);
});
  }
 openMapPage(i){
   this.navCtrl.push(MapPage, {
     data1: this.shops[i],
     data2: this.saddress[i]
   });
 }
}
