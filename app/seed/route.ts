import { sql } from "@vercel/postgres";


export async function GET() {

  // Apagartodas as tabelas
  /*
   await sql`DROP TABLE IF EXISTS home CASCADE;`;
   await sql`DROP TABLE IF EXISTS users CASCADE;`;
   await sql`DROP TABLE IF EXISTS curiosidades CASCADE;`;
   await sql`DROP TABLE IF EXISTS insolito CASCADE;`;
   await sql`DROP TABLE IF EXISTS tecnologia CASCADE;`;
   await sql`DROP TABLE IF EXISTS desporto CASCADE;`;
   await sql`DROP TABLE IF EXISTS virais CASCADE;`;
   await sql`DROP TABLE IF EXISTS noticias CASCADE;`;
   await sql`DROP TABLE IF EXISTS videos CASCADE;`;
   await sql`DROP TABLE IF EXISTS artigos CASCADE;`;
 */
  // Criar tabela noticias
  await sql`
    CREATE TABLE IF NOT EXISTS home (
      id SERIAL PRIMARY KEY,
      titulo TEXT UNIQUE NOT NULL,
      imagem TEXT NOT NULL,
      categoria TEXT NOT NULL
    );
  `;

// Inserir notícias iniciais
await sql`
    INSERT INTO home (titulo, imagem, categoria) VALUES
      (
        '10 Cenas Fixes que vais adorar',
        '/images/curiosidades.jpg',
        'Curiosidades'
      ),
      (
        'Os melhores memes da semana',
        '/images/memes.jpg',
        'Humor'
      ),
      (
        'Top 5 filmes que tens de ver',
        '/images/filmes.jpg',
        'Cinema'
      ),
      (
        'Novidades tecnológicas incríveis',
        '/images/tecnologia.jpg',
        'Tecnologia'
      ),
        (
        'Receitas fáceis e deliciosas',
        '/images/culinaria.jpg',
        'Lifestyle'
      ),
      (
        'Desporto: melhores momentos da semana',
        '/images/desporto.jpg',
        'Desporto'
      )

    ON CONFLICT DO NOTHING;
  `;

// Criar tabela artigos
await sql`
    CREATE TABLE IF NOT EXISTS artigos (
      id SERIAL PRIMARY KEY,
      titulo TEXT UNIQUE NOT NULL,
      categoria TEXT NOT NULL
    );
  `;

// Criar tabela videos
await sql`
    CREATE TABLE IF NOT EXISTS videos (
      id SERIAL PRIMARY KEY,
      url TEXT NOT NULL,
      artigo_id INTEGER REFERENCES artigos(id) ON DELETE CASCADE
    );
  `;

// Inserir artigos
await sql`
    INSERT INTO artigos (titulo, categoria) VALUES
      ('10 Cenas Fixes que vais adorar', 'Curiosidades'),
      ('Os melhores memes da semana', 'Humor'),
      ('Top 5 filmes que tens de ver', 'Cinema'),
      ('Novidades tecnológicas incríveis', 'Tecnologia'),
      ('Receitas fáceis e deliciosas', 'Lifestyle'),
      ('Desporto: melhores momentos da semana', 'Desporto')
    ON CONFLICT DO NOTHING;
  `;

// Inserir vídeos
await sql`
    INSERT INTO videos (url, artigo_id) VALUES
      ('QM3NgoWamdg', 1),
      ('y5BpRaOA3fc', 1),
      ('ttqaYUucMXA', 2),
      ('gnIiGW4v-Jo', 2),
      ('HyPtR4kGtAE', 2),
      ('EW41mBzvCVQ', 2),
      ('rAZzbDVcrMQ', 2),
      ('nSoJN6uoBXo', 2),
      ('BLH_aRk0dtM', 3),
      ('wCFTdrlDrNQ', 4),
      ('18md1nwaca4', 5),
      ('MNxNNsgXAMY', 6)
    ON CONFLICT DO NOTHING;
  `;


// Criar tabela noticias
await sql`
    CREATE TABLE IF NOT EXISTS noticias (
      id SERIAL PRIMARY KEY,
      titulo TEXT UNIQUE NOT NULL,
      imagem TEXT NOT NULL,
      texto TEXT NOT NULL
    );
  `;

// Inserir notícias iniciais
await sql`
    INSERT INTO noticias (titulo, imagem, texto) VALUES
      (
        'Maniche e Rui Santos entram em guerra em direto e moderadora é obrigada a intervir',
        '/images/ruiEmaniche.jpg',
        'Maniche e Rui Santos protagonizaram um momento de alta tensão em direto na CNN Portugal,num debate que rapidamente descambou para uma troca acesa de acusações. Tudo começou quando o ex-internacional português acusou Rui Santos de desvalorizar as conquistas do FC Porto nas décadas de 80, 90 e 2000, insinuando que o comentador tendia a justificar o sucesso dos azuis e brancos com questões fora das quatro linhas'
      ),
      (
        'Adeptos do Galatasaray “incendiaram” a noite do Liverpool com show pirotécnico e muito barulho',
        '/images/liverpool.jpg',
        'Os jogadores do Liverpool viveram uma noite agitada em Istambul, na véspera do duelo frente ao Galatasaray, a contar para a segunda jornada da fase de grupos da Liga dos Campeões. Dezenas de adeptos da formação turca concentraram-se junto ao hotel onde a equipa inglesa está hospedada e lançaram engenhos pirotécnicos durante a madrugada, numa tentativa de perturbar o descanso do plantel orientado por Arne Slot.'
      ),
      (
        'Rapper Oruam é levado em ombros por fãs após 69 dias em prisão preventiva',
        '/images/rapper.jpg',
        'Oruam, rapper brasileiro e filho de um dos líderes do Comando Vermelho, foi libertado após 69 dias em prisão preventiva. O tribunal considerou não haver motivos suficientes para manter a detenção, destacando a pequena quantidade de droga apreendida (73g de cocaína) e os “bons antecedentes do rapper”'
      )
    ON CONFLICT DO NOTHING;
  `;

// Criar tabela virais
await sql`
    CREATE TABLE IF NOT EXISTS virais (
      id SERIAL PRIMARY KEY,
      titulo TEXT UNIQUE NOT NULL,
      imagem TEXT NOT NULL,
      texto TEXT NOT NULL
    );
  `;

// Inserir dados iniciais
await sql`
    INSERT INTO virais (titulo, imagem, texto) VALUES
      (
        'Rolls-Royce histórico avaliado em 1 milhão de euros destruído ao embater em viaduto da A1',
        '/images/viral1.jpg',
        'Um Rolls-Royce Silver Ghost de 1920, avaliado em um milhão de euros e pertencente ao Museu do Caramulo, ficou destruído ao embater num viaduto da A1, na Póvoa de Santa Iria, distrito de Lisboa. O veículo seguia num camião porta-carros, mas a altura do transporte terá causado o acidente. As causas ainda não estão completamente esclarecidas, mas suspeita-se que um erro de cálculo do motorista do pesado tenha estado na origem do embate.'
      ),
      (
        'Joana Amaral Dias “invade” praxe académica e mostra o seu desagrado com os atos praticados pelos estudantes',
        '/images/viral2.jpg',
        'Joana Amaral Dias decidiu intervir de forma inesperada numa praxe académica que decorria em Lisboa. A comentadora e antiga deputada apareceu no local com um telemóvel a filmar, para manifestar o seu desagrado relativamente às práticas levadas a cabo pelos estudantes.'
      )
    ON CONFLICT DO NOTHING;
  `;

// Criar tabela desporto
await sql`
    CREATE TABLE IF NOT EXISTS desporto (
      id SERIAL PRIMARY KEY,
      titulo TEXT UNIQUE NOT NULL,
      imagem TEXT NOT NULL,
      texto TEXT NOT NULL
    );
  `;

// Inserir dados iniciais
await sql`
    INSERT INTO desporto (titulo, imagem, texto) VALUES
      (
        'Momento histórico no Mundial sub-20: Foi utilizado o “cartão verde” pela 1ª vez',
        '/images/desporto1.jpg',
        'O Mundial de sub-20, que decorre no Chile, ficou marcado por um momento histórico: a estreia do cartão verde — que, afinal, é azul. No minuto 37 do encontro entre Coreia do Sul e Ucrânia, o selecionador sul-coreano, Lee Chang-won, utilizou este novo recurso para solicitar ao árbitro a análise de um lance duvidoso na área adversária, após a queda de um dos seus jogadores. Apesar da novidade, o pedido não trouxe benefícios à equipa asiática, já que o árbitro costa-riquenho Keylor Herrera, depois de rever as imagens no VAR, manteve a decisão inicial e optou por não assinalar qualquer infração.'
      ),
      (
        'José Mourinho deixou Laura Woods de mão estendida e o momento tornou-se viral',
        '/images/desporto2.jpg',
        'Laura Woods, repórter da TNT Sports, viveu um momento constrangedor durante a cobertura do Chelsea-Benfica. Ao tentar cumprimentar José Mourinho com um aperto de mão na mesa de comentários, o treinador acabou por não se aperceber e continuou a falar com Joe Cole, antigo jogador que orientou nos tempos em que esteve no Chelsea. A reação de Laura Woods, de mão estendida e visivelmente surpreendida por ter sido ignorada, rapidamente se tornou viral nas redes sociais. Apesar do “incidente”, Woods acabou por conseguir cumprimentar Mourinho logo de seguida.'
      )
    ON CONFLICT DO NOTHING;
  `;

// Criar tabela insólitos
await sql`
    CREATE TABLE IF NOT EXISTS insolito (
      id SERIAL PRIMARY KEY,
      titulo TEXT UNIQUE NOT NULL,
      imagem TEXT NOT NULL,
      texto TEXT NOT NULL
    );
  `;

// Inserir dados iniciais
await sql`
    INSERT INTO insolito (titulo, imagem, texto) VALUES
      (
        'Passageiro adormece de forma abusiva no avião e mulher à sua frente decide retaliar',
        '/images/insolito1.jpg',
        'Um passageiro acabou por dormir de forma particularmente incômoda num voo, recostando-se sem pensar na senhora sentada à sua frente. A passageira, visivelmente incomodada, decidiu reagir de forma criativa… e abriu espaço para uma “sessão de pedicure improvisada”, aproveitando a situação para se vingar do comportamento do vizinho de poltrona.'
      ),
      (
        'Pai não esperava as “rajadas” potentes do filho e salta de susto na hora de mudar a fralda',
        '/images/insolito2.jpg',
        'Shaq Barrett, jogador da NFL, estava a ajudar a esposa a mudar a fralda do filho. Durante a troca, a criança teve um “acidente” de diarreia. A força e a rapidez do incidente foram suficientes para fazer Barrett saltar da cadeira na tentativa de se afastar da confusão. No entanto, mesmo com o salto brutal da cadeira, acabou por não conseguir escapar totalmente à situação, tornando o momento engraçado e viral nas redes sociais.'
      )
    ON CONFLICT DO NOTHING;
  `;

// Criar tabela tecnologia
await sql`
    CREATE TABLE IF NOT EXISTS tecnologia (
      id SERIAL PRIMARY KEY,
      titulo TEXT UNIQUE NOT NULL,
      imagem TEXT NOT NULL,
      texto TEXT NOT NULL
    );
  `;

// Inserir dados iniciais
await sql`
    INSERT INTO tecnologia (titulo, imagem, texto) VALUES
      (
        'Executivo da Apple desafia jornalista a partir ao meio o finíssimo iPhone Air… “Fica por minha conta se conseguires”',
        '/images/tec1.jpg',
        'A Apple revelou esta semana a nova série iPhone 17, composta por quatro modelos, destacando-se especialmente o iPhone Air, que se tornou no telemóvel mais fino alguma vez lançado pela marca, com apenas 5,6 mm de espessura...'
      ),
      (
        'Como é andar de robotaxi… “o Uber sem condutor” que já opera nos EUA',
        '/images/tec2.jpg',
        'Como é viajar num carro que conduz sozinho, sem motorista ao volante? O YouTuber de tecnologia Marques Brownlee foi até ao Texas e experimentou a experiência completa de um robotaxi, desde a interação com a app até à viagem no veículo autónomo, comentando a sua sensação de segurança e conveniência.'
      ),
      (
        'Posto de combustível na China usa robô para abastecer carros de forma autónoma',
        '/images/tec3.jpg',
        'Um vídeo gravado recentemente na China está a dar que falar nas redes sociais, ao mostrar um posto de combustível onde já não são precisos funcionários humanos. O robô abastece carros de forma autónoma, controlando a quantidade de combustível e a segurança do processo.'
      )
    ON CONFLICT DO NOTHING;
  `;

// Criar tabela curiosidades
await sql`
  CREATE TABLE IF NOT EXISTS curiosidades (
    id SERIAL PRIMARY KEY,
    titulo TEXT UNIQUE NOT NULL,
    imagem TEXT NOT NULL,
    texto TEXT NOT NULL,
    video TEXT
  );
`;

// Inserir dados
await sql`
  INSERT INTO curiosidades (titulo, imagem, texto, video) VALUES
    (
      'Maior cápsula do tempo foi finalmente aberta 48 anos depois',
      '/images/curiosidade1.jpg',
      'Na passada sexta-feira, foi finalmente aberta aquela que é considerada a maior cápsula do tempo do mundo, criada em 1977 por Harold Davisson. O momento reuniu centenas de pessoas, muitas delas descendentes ou familiares dos autores dos objetos guardados. Davisson idealizou esta cápsula com o propósito de deixar memórias da sua época aos netos, permitindo-lhes compreender como era a vida nos anos 70.',
      NULL
    ),
    (
      'Hotel com 11 metros de altura e 56 centímetros na zona mais estreita faz furor na China',
      '/images/curiosidade2.jpg',
      'Com apenas 56 centímetros de largura no ponto mais estreito e 11 metros de altura, o “Hotel da Lâmina”, em Chongqing, no sudoeste da China, está a tornar-se um fenómeno turístico. A estrutura invulgar, que parece desafiar as leis da física, rapidamente captou a atenção nas redes sociais e entre visitantes curiosos. Apesar das dimensões reduzidas, o hotel é funcional e conta com várias divisões distribuídas verticalmente. O nome “Hotel da Lâmina” surge da sua silhueta fina e comprida, que lembra uma lâmina erguida no meio da cidade.',
      NULL
    ),
    (
      'Tiagovski revela quanto custa manter um Lamborghini Huracán anualmente em Portugal',
      '/images/curiosidade3.jpg',
      'Ter um Lamborghini Huracán na garagem é um sonho para muitos, mas mantê-lo pode transformar esse sonho num verdadeiro desafio financeiro, mesmo para quem tem a conta bancária mais folgada. O YouTuber português Tiagovski, proprietário de um Huracán há cerca de um ano, decidiu partilhar com os seguidores os custos reais de manter um supercarro como este… e os números não são para todos. Comecemos pelo básico: a primeira revisão feita na Lamborghini Lisboa ficou por 2200 euros. Só o Imposto Único de Circulação (IUC), obrigatório todos os anos, ronda os 900 euros. Já o seguro para cobrir danos próprios, imprescindível em carros deste calibre, é o que mais pesa: cerca de 5500 euros anuais. E claro, há o combustível, e com um V10 debaixo do capô, não se espera moderação no consumo. Segundo Tiagovski, se juntarmos o valor da gasolina, num ano aproxima-se dos 10000 euros em gastos.',
      NULL
    )
  ON CONFLICT DO NOTHING;
`;


return new Response("tabelas populadas");

}
