import axios from "axios";
import { API_URL } from "../config/config";

const getAllItems = async () => {
    
  try {
      const res = await axios.get(`${API_URL}/api/user/getEmergencyItems`)
      if (res.data) {
        console.log(res.data)
          return res.data;
      }
  } catch (error) {
  }
  return null;
};

export const items = await getAllItems();
// export const items = [
//   {
//     image: "/images/self-items.jpg",
//     label: "Անձնական պարագաներ",
//     contents: [
//       {
//         name: "Ականջի փայտիկ",
//         available: true,
//         image: "/images/bag_items/akanji-chop.png",
//         description: "Օգտագործվում է ականջի մաքրության համար",
//         price: 20
//       },
//       {
//         name: "Օճառ",
//         available: true,
//         image: "/images/bag_items/ojar.png",
//         description: "Հարմար է մարմնի կամ հագուստի լվացման համար",
//         price: 30
//       },
//       {
//         name: "Սրբիչ",
//         available: false,
//         image: "/images/bag_items/srbich.png",
//         description: "Ցանկալի է փոքր, արագ չորացող միկրոֆիբր սրբիչ",
//         price: 50
//       },
//       {
//         name: "Մկրատ",
//         available: false,
//         image: "/images/bag_items/mkrat.png",
//         description: "Փոքր, անվտանգ, բազմաֆունկցիոնալ",
//         price: 45
//       },
//       {
//         name: "«Զիփ» փականով տոպրակներ",
//         available: true,
//         image: "/images/bag_items/toprak.png",
//         description: "Պահպանում է սնունդը կամ այլ իրեր ջրից",
//         price: 25
//       },
//       {
//         name: "Ատամի խոզանակ",
//         available: false,
//         image: "/images/bag_items/xozanak.png",
//         description: "Օգտագործվում է ատամները մաքրելու համար",
//         price: 20
//       },
//       {
//         name: "Անձեռոցիկ (թաց/չոր)",
//         available: false,
//         image: "/images/bag_items/andzerocik.png",
//         description: "Տարածքային մաքրության համար",
//         price: 15
//       },
//       {
//         name: "Զուգարանի թուղթ",
//         available: true,
//         image: "/images/bag_items/zugarani-tuxt.png",
//         description: "Ցանկալի է կոմպակտ, առանց թղթե գլանիկի տարբերակը",
//         price: 18
//       },
//     ]
//   },
//   {
//     image: "/images/clothes.jpg",
//     label: "Հագուստ",
//     contents: [
//       {
//         name: "Հագուստ (համապատասխան եղանակի)",
//         available: true,
//         image: "/images/bag_items/verarku.png",
//         description: "Պաշտպանել հագուստը թրջվելուց նույնիսկ պայուսակի խոնավության դեպքում",
//         price: 100
//       },
//       {
//         name: "Ներքնաշոր",
//         available: true,
//         image: "/images/bag_items/nerqnashor.png",
//         description: "Ցանկալի է առնվազն 1 լրացուցիչ հավաքածու",
//         price: 40
//       },
//       {
//         name: "Ձեռնոց",
//         available: true,
//         image: "/images/bag_items/dzernoc.png",
//         description: "Պահել մեկ զույգ՝ ցրտից կամ վնասվածքներից պաշտպանվելու նպատակով",
//         price: 35
//       },
//     ],
//   },
//   {
//     image: "/images/drinks.jpg",
//     label: "Ըմպելիքներ",
//     contents: [
//       {
//         name: "Պլաստիկ շշով ջուր (1 լիտր)",
//         available: true,
//         image: "/images/bag_items/jur.png",
//         description: "Հնարավորինս երկար պահպանման ժամկետով",
//         price: 15
//       },
//       {
//         name: "Սուրճ, թեյ",
//         available: false,
//         image: "/images/bag_items/surj.png",
//         description: "Պահել փակ տոպրակներում, Պաշտպանել խոնավությունից",
//         price: 25
//       },
//     ],
//   },
//   {
//     image: "/images/documents.jpg",
//     label: "Փաստաթղթեր",
//     contents: [
//       { name: "Անձնագիր", available: true, price: 0 },
//       { name: "Սոցիալական քարտ", available: false, price: 0 },
//     ],
//   },
//   {
//     image: "/images/bag_items/surj.png",
//     label: "Սնունդ",
//     contents: [
//       {
//         name: "Չորահաց",
//         available: false,
//         image: "/images/bag_items/hac.png",
//         description: "Թեթև և սննդարար, երկար պահպանման ժամկետ, պահել խոնավությունից պաշտպանված վայրում",
//         price: 22
//       },
//       {
//         name: "Խտացրած կաթ",
//         available: false,
//         image: "/images/bag_items/xtacrac-kat.png",
//         description: "Էներգետիկ սնունդ՝ հարմար արտակարգ օգտագործման համար",
//         price: 30
//       },
//       {
//         name: "Գդալ, թաս, բաժակ (մետաղական)",
//         available: true,
//         image: "/images/bag_items/spasq.png",
//         description: "Կարելի է օգտագործել ջուր եռացնելու կամ կերակուր տաքացնելու համար",
//         price: 40
//       },
//       {
//         name: "Աղ, շաքար",
//         available: false,
//         image: "/images/bag_items/ax.png",
//         description: "Պահել փակ տոպրակներով",
//         price: 10
//       },
//       {
//         name: "Պահածո (մետաղյա տարայով)",
//         available: true,
//         image: "/images/bag_items/tushonka.png",
//         description: "Արագ օգտագործման համար հարմար",
//         price: 55
//       },
//     ],
//   },
// ];
