"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type Lang = "en" | "es";

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
};

const translations: Record<string, Record<Lang, string>> = {
  /* ── Navbar ── */
  "nav.home": { en: "Home", es: "Inicio" },
  "nav.about": { en: "About", es: "Nosotros" },
  "nav.watch": { en: "Watch", es: "Ver" },
  "nav.characters": { en: "Characters", es: "Personajes" },
  "nav.parents": { en: "For Parents", es: "Para Padres" },
  "nav.resources": { en: "Resources", es: "Recursos" },
  "nav.blog": { en: "Blog", es: "Blog" },
  "nav.donate": { en: "Donate", es: "Donar" },
  "nav.subscribe": { en: "Subscribe on YouTube", es: "Suscribirse en YouTube" },

  /* ── Footer ── */
  "footer.explore": { en: "Explore", es: "Explorar" },
  "footer.resources": { en: "Resources", es: "Recursos" },
  "footer.connect": { en: "Connect", es: "Conectar" },
  "footer.downloads": { en: "Downloads", es: "Descargas" },
  "footer.press": { en: "Press & Partners", es: "Prensa y Socios" },
  "footer.rights": { en: "All rights reserved.", es: "Todos los derechos reservados." },
  "footer.privacy": { en: "Privacy Policy", es: "Politica de Privacidad" },
  "footer.terms": { en: "Terms of Use", es: "Terminos de Uso" },
  "footer.coppa": { en: "COPPA Compliance", es: "Cumplimiento COPPA" },
  "footer.made": { en: "Made with", es: "Hecho con" },
  "footer.families": { en: "for families everywhere", es: "para familias en todas partes" },
  "footer.desc": { en: "Faith-based kids music with stunning 3D animation. Original Bible songs the whole family will love.", es: "Musica cristiana para ninos con animacion 3D impresionante. Canciones biblicas originales que toda la familia amara." },

  /* ── About ── */
  "about.badge": { en: "Our Story", es: "Nuestra Historia" },
  "about.title": { en: "About", es: "Sobre" },
  "about.highlight": { en: "Selah Kids", es: "Selah Kids" },
  "about.desc": { en: "Launched in 2024 by parents who wanted more Christian media options for families with little ones. We create a safe, Christ-filled space for children and adults to worship together.", es: "Lanzado en 2024 por padres que querian mas opciones de medios cristianos para familias con pequenos. Creamos un espacio seguro y lleno de Cristo para que ninos y adultos adoren juntos." },
  "about.mission.badge": { en: "Our Mission", es: "Nuestra Mision" },
  "about.mission.title": { en: "Teaching Biblical Principles", es: "Ensenando Principios Biblicos" },
  "about.mission.highlight": { en: "Through Song", es: "A Traves del Canto" },
  "about.mission.p1": { en: "Our songs teach biblical principles in a way that kids can connect with. Each song is carefully crafted to be catchy, fun, and grounded in scripture so that children learn God's word through music and movement.", es: "Nuestras canciones ensenan principios biblicos de una manera con la que los ninos pueden conectar. Cada cancion esta cuidadosamente elaborada para ser pegadiza, divertida y basada en las escrituras." },
  "about.mission.p2": { en: "We believe that worship should be joyful, and our mission is to bring families closer to God through the power of music.", es: "Creemos que la adoracion debe ser gozosa, y nuestra mision es acercar a las familias a Dios a traves del poder de la musica." },
  "about.cinema.badge": { en: "Cinema Quality", es: "Calidad Cinematografica" },
  "about.cinema.title": { en: "Stunning", es: "Impresionante" },
  "about.cinema.highlight": { en: "Animation", es: "Animacion" },
  "about.cinema.p1": { en: "Our videos are crafted by top-tier animators from around the world. Every frame is designed to captivate tiny eyes and spark boundless imagination.", es: "Nuestros videos son creados por animadores de primer nivel de todo el mundo. Cada cuadro esta disenado para cautivar a los mas pequenos." },
  "about.cinema.p2": { en: "This is not another low-budget YouTube channel. Every scene is a masterpiece designed to rival major animation studios.", es: "Este no es otro canal de YouTube de bajo presupuesto. Cada escena es una obra maestra disenada para rivalizar con los grandes estudios de animacion." },
  "about.values.badge": { en: "What We Believe", es: "Lo Que Creemos" },
  "about.values.title": { en: "Our Core", es: "Nuestros" },
  "about.values.highlight": { en: "Values", es: "Valores" },
  "about.val.christ.title": { en: "Christ-Centered", es: "Centrado en Cristo" },
  "about.val.christ.desc": { en: "Jesus is at the center of every story, every song, and every adventure we create.", es: "Jesus esta en el centro de cada historia, cada cancion y cada aventura que creamos." },
  "about.val.kid.title": { en: "Kid-First Design", es: "Diseno para Ninos" },
  "about.val.kid.desc": { en: "Age-appropriate, screen-time conscious content designed specifically for little hearts and minds.", es: "Contenido apropiado para la edad, consciente del tiempo de pantalla, disenado para corazones y mentes pequenas." },
  "about.val.theo.title": { en: "Theologically Sound", es: "Teologicamente Solido" },
  "about.val.theo.desc": { en: "Every lyric is carefully reviewed for biblical accuracy and doctrinal integrity.", es: "Cada letra es cuidadosamente revisada para precision biblica e integridad doctrinal." },
  "about.val.joy.title": { en: "Joyful & Inclusive", es: "Gozoso e Inclusivo" },
  "about.val.joy.desc": { en: "Reflecting the beautiful diversity of God's creation in every character and story.", es: "Reflejando la hermosa diversidad de la creacion de Dios en cada personaje e historia." },

  /* ── Watch ── */
  "watch.badge": { en: "Watch & Listen", es: "Ver y Escuchar" },
  "watch.title": { en: "Discover Our", es: "Descubre Nuestros" },
  "watch.highlight": { en: "Videos", es: "Videos" },
  "watch.desc": { en: "Explore our growing collection of faith-based music videos designed to get kids singing, dancing, and learning about God's word.", es: "Explora nuestra creciente coleccion de videos musicales basados en la fe, disenados para que los ninos canten, bailen y aprendan la palabra de Dios." },
  "watch.all": { en: "All Videos", es: "Todos" },
  "watch.music": { en: "Music Videos", es: "Videos Musicales" },
  "watch.singalong": { en: "Sing-Alongs", es: "Para Cantar" },
  "watch.sensory": { en: "Sensory Videos", es: "Videos Sensoriales" },
  "watch.cta.title": { en: "Subscribe on", es: "Suscribete en" },
  "watch.cta.desc": { en: "Be the first to see new songs, characters, and worship videos.", es: "Se el primero en ver nuevas canciones, personajes y videos de adoracion." },
  "watch.cta.en": { en: "English Channel", es: "Canal en Ingles" },
  "watch.cta.es": { en: "Canal en Espanol", es: "Canal en Espanol" },

  /* ── Characters ── */
  "chars.badge": { en: "Say Hello", es: "Saluda" },
  "chars.title": { en: "Meet the", es: "Conoce a los" },
  "chars.highlight": { en: "Characters", es: "Personajes" },
  "chars.desc": { en: "Get to know Andy, Libni, and Shiloh — the stars of Selah Kids who bring every song and story to life.", es: "Conoce a Andy, Libni y Shiloh — las estrellas de Selah Kids que dan vida a cada cancion e historia." },
  "chars.facts": { en: "Fun Facts", es: "Datos Divertidos" },

  /* ── Parents ── */
  "parents.badge": { en: "Peace of Mind", es: "Tranquilidad" },
  "parents.title": { en: "For", es: "Para" },
  "parents.highlight": { en: "Parents", es: "Padres" },
  "parents.desc": { en: "We created Selah Kids because we're parents too. Here's everything you need to know about the content your children will enjoy.", es: "Creamos Selah Kids porque tambien somos padres. Aqui encontraras todo lo que necesitas saber sobre el contenido que tus hijos disfrutaran." },
  "parents.adfree": { en: "Ad-Free Content", es: "Sin Anuncios" },
  "parents.scripture": { en: "Scripture-Based", es: "Basado en Escrituras" },
  "parents.ages": { en: "Ages 0-8", es: "Edades 0-8" },
  "parents.approved": { en: "Parent Approved", es: "Aprobado por Padres" },

  /* ── Resources ── */
  "resources.badge": { en: "Free Downloads", es: "Descargas Gratis" },
  "resources.title": { en: "Lyrics &", es: "Letras y" },
  "resources.highlight": { en: "Resources", es: "Recursos" },
  "resources.desc": { en: "Download free lyric sheets, coloring pages, Bible verse memory cards, and ministry guides for your family or church.", es: "Descarga hojas de letras, paginas para colorear, tarjetas de versos biblicos y guias ministeriales gratis para tu familia o iglesia." },
  "resources.download": { en: "Download Free", es: "Descargar Gratis" },
  "resources.coming": { en: "More Resources Coming Soon", es: "Mas Recursos Proximamente" },
  "resources.coming.desc": { en: "We are working on new coloring pages, activity sheets, and devotional guides. Stay tuned.", es: "Estamos trabajando en nuevas paginas para colorear, hojas de actividades y guias devocionales. Mantente atento." },

  /* ── Blog ── */
  "blog.badge": { en: "Read & Grow", es: "Lee y Crece" },
  "blog.title": { en: "Blog &", es: "Blog y" },
  "blog.highlight": { en: "Devotionals", es: "Devocionales" },
  "blog.desc": { en: "Parenting tips, behind-the-scenes stories, faith-building devotionals, and more from the Selah Kids team.", es: "Consejos para padres, historias detras de escena, devocionales para fortalecer la fe y mas del equipo de Selah Kids." },
  "blog.all": { en: "All", es: "Todos" },
  "blog.parenting": { en: "Parenting", es: "Crianza" },
  "blog.bts": { en: "Behind the Scenes", es: "Detras de Escena" },
  "blog.faith": { en: "Faith & Learning", es: "Fe y Aprendizaje" },
  "blog.devotional": { en: "Devotional", es: "Devocional" },
  "blog.readmore": { en: "Read more", es: "Leer mas" },

  /* ── Donate ── */
  "donate.badge": { en: "Make a Difference", es: "Haz la Diferencia" },
  "donate.title": { en: "Support", es: "Apoya a" },
  "donate.highlight": { en: "Selah Kids", es: "Selah Kids" },
  "donate.desc": { en: "Your generous gift helps us create more faith-filled music, stunning animation, and free resources for families around the world.", es: "Tu generoso regalo nos ayuda a crear mas musica llena de fe, animacion impresionante y recursos gratuitos para familias de todo el mundo." },
  "donate.onetime": { en: "One-Time", es: "Una Vez" },
  "donate.monthly": { en: "Monthly", es: "Mensual" },
  "donate.annual": { en: "Annual", es: "Anual" },
  "donate.btn": { en: "Donate", es: "Donar" },
  "donate.secure": { en: "Secure payment powered by Stripe. Tax-deductible donation.", es: "Pago seguro con Stripe. Donacion deducible de impuestos." },
  "donate.impact": { en: "Your", es: "Tu" },
  "donate.impact.hl": { en: "Impact", es: "Impacto" },
  "donate.i1": { en: "Funds one day of animation production", es: "Financia un dia de produccion de animacion" },
  "donate.i2": { en: "Translates a song into Spanish", es: "Traduce una cancion al espanol" },
  "donate.i3": { en: "Provides resources for 100 Sunday Schools", es: "Proporciona recursos para 100 Escuelas Dominicales" },

  /* ── Contact ── */
  "contact.badge": { en: "Get In Touch", es: "Contactanos" },
  "contact.title": { en: "Contact", es: "Contacto" },
  "contact.highlight": { en: "Us", es: "" },
  "contact.desc": { en: "Have a question, partnership inquiry, or just want to say hi? We'd love to hear from you.", es: "Tienes alguna pregunta, consulta de asociacion o simplemente quieres saludar? Nos encantaria saber de ti." },
  "contact.send": { en: "Send a Message", es: "Enviar un Mensaje" },
  "contact.name": { en: "Name", es: "Nombre" },
  "contact.email": { en: "Email", es: "Correo" },
  "contact.subject": { en: "Subject", es: "Asunto" },
  "contact.message": { en: "Message", es: "Mensaje" },
  "contact.submit": { en: "Send Message", es: "Enviar Mensaje" },
  "contact.sent": { en: "Message Sent", es: "Mensaje Enviado" },
  "contact.sent.desc": { en: "Thank you for reaching out. We will get back to you soon.", es: "Gracias por escribirnos. Nos pondremos en contacto pronto." },
  "contact.another": { en: "Send Another Message", es: "Enviar Otro Mensaje" },
  "contact.general": { en: "General Inquiries", es: "Consultas Generales" },
  "contact.partnership": { en: "Partnership & Ministry", es: "Asociacion y Ministerio" },
  "contact.press": { en: "Press & Media", es: "Prensa y Medios" },
  "contact.follow": { en: "Follow Us", es: "Siguenos" },

  /* ── Espanol ── */
  "es.badge": { en: "Welcome", es: "Bienvenidos" },
  "es.title": { en: "Selah Kids", es: "Selah Kids" },
  "es.highlight": { en: "in Spanish", es: "en Espanol" },
  "es.desc": { en: "Christian music for kids with stunning 3D animation. Original Bible songs the whole family will love.", es: "Musica cristiana para ninos con animacion 3D impresionante. Canciones biblicas originales que toda la familia amara." },

  /* ── Press ── */
  "press.badge": { en: "Work With Us", es: "Trabaja Con Nosotros" },
  "press.title": { en: "Press &", es: "Prensa y" },
  "press.highlight": { en: "Partners", es: "Socios" },
  "press.desc": { en: "Everything journalists, ministry leaders, and collaborators need to share the Selah Kids story.", es: "Todo lo que periodistas, lideres ministeriales y colaboradores necesitan para compartir la historia de Selah Kids." },
  "press.kit": { en: "Press Kit", es: "Kit de Prensa" },
  "press.kit.desc": { en: "Download our complete press kit including brand overview, founder bios, high-resolution imagery, and key talking points.", es: "Descarga nuestro kit de prensa completo incluyendo resumen de marca, biografias de fundadores, imagenes de alta resolucion y puntos clave." },
  "press.kit.btn": { en: "Download Press Kit", es: "Descargar Kit de Prensa" },
  "press.partner": { en: "Partnerships", es: "Asociaciones" },
  "press.partner.desc": { en: "Interested in using Selah Kids in your church, school, or ministry? We would love to work with you to bring faith-filled music to more families.", es: "Interesado en usar Selah Kids en tu iglesia, escuela o ministerio? Nos encantaria trabajar contigo para llevar musica llena de fe a mas familias." },
  "press.partner.btn": { en: "Partner With Us", es: "Asociate Con Nosotros" },
  "press.assets": { en: "Brand", es: "Activos de" },
  "press.assets.hl": { en: "Assets", es: "Marca" },
  "press.facts": { en: "Quick Facts", es: "Datos Rapidos" },
};

const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  setLang: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  const t = useCallback(
    (key: string): string => {
      const entry = translations[key];
      if (!entry) return key;
      return entry[lang] || entry.en || key;
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
