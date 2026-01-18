
import 'dotenv/config'

const EVENT_ID = 1;
const TOKEN = process.env['USER_TOKEN']; 
const STARTING_STOCK = 99;
const TOTAL_REQUESTS = 150;
const API_URL = `http://localhost:3000/api/events/${EVENT_ID}/book`;

async function attack() {
  console.log(`⚔️ MULAI SERANGAN KE EVENT ID: ${EVENT_ID}`);
  console.log(
    `📦 Stok Awal: ${STARTING_STOCK} | Total Penyerang: ${TOTAL_REQUESTS}`
  );
  console.log("=================================================");

  const requests = [];


  for (let i = 0; i < TOTAL_REQUESTS; i++) {
    console.log(`🚀 Mengirim Request ke-${i + 1}...`);

    const req = fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }).then((res) => res.json().then((data) => ({ status: res.status, data })));

    requests.push(req);
  }

  console.log("⏳ Menunggu hasil perang...");
  const results = await Promise.all(requests);

  console.log("=================================================");
  console.log("🏁 SERANGAN SELESAI. HASIL:");

  let successCount = 0;
  let failCount = 0;

  results.forEach((res, index) => {
    if (res.status === 201) {
      successCount++;
      console.log(`✅ Request ${index + 1}: SUKSES DAPET TIKET!`);
    } else {
      failCount++;
      console.log(
        `❌ Request ${index + 1}: GAGAL (${res.status}) - ${res.data.message}`
      );
    }
  });

  console.log("=================================================");
  console.log(`📊 TOTAL SUKSES: ${successCount} (Harusnya cuma ${STARTING_STOCK})`);
  console.log(
    `💀 KELEBIHAN TIKET (OVERBOOKED): ${Math.max(0, successCount - STARTING_STOCK)}`
  );
}

attack();
