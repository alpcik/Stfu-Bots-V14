module.exports = {
    conf: {
      aliases: ["iltifat","ilgi", "ilgiver", "ilgi-ver", "iltifat-et", "iltifatet"],
      name: "iltifat",
      help: "iltifat [stfu/ID]",
     category: "kullanıcı",     
    },
  
run: async ( message, args ) => {

    let iltifatlar = [
        "Üzerinde pijama olsa bile, nasıl oluyor da her zaman bu kadar güzel görünüyorsun? Merhaba, neden bu kadar güzel olduğunu bilmek istiyorum.",
        "Etrafımda olduğunda başka bir şeye ihtiyacım olmuyor.",
        "Güzel bebeğime günaydın! Sabah gülen yüzünü gördüğümde her şey duruyor. Uyan tatlım ve güzel yüzünle günümüzü aydınlat.",
        "Mutluluk ne diye sorsalar, cevabı gülüşünde ve o sıcak bakışında arardım.",
        "Yanında olduğum her an yüzümü güldüren sensin. Benim için dünyanın anlamısın. Senin gibi birini tanıdığım için çok şanslıyım dostum!",
        "Güzel bir sabah geçir bebeğim! Beni düşünerek bu güzel sabahın tadını çıkar sevgilim. Seni çok seviyorum!",
        "Huzur kokuyor geçtiğin her yer.",
        "Bir şeyler ters gittiğinde, aramak istediğim ilk kişi sensin.",
        "Sen benim düşlerimin surete bürünmüş halisin.",
        "Bir sahil kasabasının huzuru birikmiş yüzüne.",
        "Gülüşünde nice ilaçlar var yarama merhem olan.",
        "Gece nasıl sabahı bekliyorsa aydınlanmak için ben de seni öyle bekliyorum.",
        "Işığınla gecemi aydınlatıyorsun.",
        "Yağmurdan sonra açan gök kuşağı gibisin, öyle güzel ve özel!",
        "Öyle bir duru güzelliğin var ki, seni gören şairler bile adına günlerce şiir yazardı.",
        "Gözlerinin hareketi bile yeter  benim aklımı başımdan almaya.",
        "Seni kelimeler ile anlatmak çok zor. Muhteşem desem yine eksik kalıyor anlamın.",
        "Güller bile kıskanır seni gördükleri zaman kendi güzelliklerini.",
        "Hiç yazılmamış bir şiirsin sen, daha önce eşi benzeri olmayan.",
        "Bu kadar muhteşem olamaz bir insan. Bu kadar kusursuz bu kadar mükemmel.. Kirpiklerinin dizilişi bile sırayla senin.",
        "Adım şaire çıktı civarda. Kimse senin şiir olduğunun farkında değil henüz.",
        "Senin güzelliğini anlatmaya dünyalar değil, lisanlar bile yetmez.",
        "Etkili gülüş kavramını ben senden öğrendim.",
        "Seni yanlışlıkla cennetten düşürmüşler. Dünyada yaşayan bir meleksin sen.",
        "Seni anlatmaya kelimeler bulamıyorum. Nasıl anlatacağımı bilemediğim için seni kimselere anlatamıyorum.",
        "Gözlerinin gördüğü her yer benimdir. Bakışına şahit olan her toprak benim de vatanımdır.",
        "Gözlerinle baharı getirdin garip gönlüme.",
        "Bir gülüşün ile çiçek açıyor bahçemdeki her bir çiçek.",
        "Yuva kokuyor kucağın. Sarılınca seninle yuva kurası geliyor insanın.",
        "Seni de bu dünyada görünce yaşama sebebimi anladım. Meğer senmişsin beni dünyada yaşamaya zorlayan.",
        "Aynı zaman diliminde yaşamak benim için büyük ödüldür.",
        "Seninle aşkı yaşamak çok güzel bir şey ama sensiz kalma korkusunu düşünmek korkutuyor beni.",
        "Seni severek meslek sahibi oldum ben. Seni sevmeye başladıkça şair oldum.",
        "Gülüşün güzelliğine anlam katıyor. Gamzelerin ise bambaşka diyarların kapılarını açıyor.",
        "Senin gülüşünü gördüğüm günden beri ağlamalarımı unuttum.",
        "Kimse konuşmasın yalnız sen konuş bana. Yalnız sen bak gözlerimin içine. Kimse olmasın yalnızca sen ol benim hayatımda.",
        "Ben seninle birlikte yaşayabilmek için ikinci kere geldim hayata.",
        "Senin attığın adımlarda seni korumak için geçtiğin yol olmak isterdim. Seni emniyete alan ve sonsuz bir yolculuğa çıkaran bir yol.",
        "Aklıma sevmek geldiğinde, gözlerimin önüne sen geliyorsun. Günün her saati canım sevmek istiyor ve seni düşünüyor kalbim",
      ];
    const member = await message.mentions.members.first() ||await message.guild.members.cache.get(args[0]) || await message.member
    if(member){
       await message.delete()
    message.channel.send({content:`${member}, ${iltifatlar[Math.floor(Math.random() * iltifatlar.length)]}`})
    }
}
}    