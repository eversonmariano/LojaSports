-- -----------------------------------------------------
-- Schema full-stack-sports-center
-- -----------------------------------------------------
CREATE DATABASE IF NOT EXISTS `sports-center`;

USE `sports-center` ;

-- Drop existing tables if they exist
DROP TABLE IF EXISTS Brand;
DROP TABLE IF EXISTS Type;
DROP TABLE IF EXISTS Product;

-- Create the Brand table
CREATE TABLE `Brand` (
                         `Id` INT AUTO_INCREMENT PRIMARY KEY,
                         `Name` VARCHAR(500) NOT NULL
);

-- Insert data into the Brand table
INSERT INTO Brand (Name) VALUES
                             ('Adidas'),
                             ('ASICS'),
                             ('Victor'),
                             ('Yonex'),
                             ('Puma'),
                             ('Nike'),
                             ('Babolat');

-- Create the Type table
CREATE TABLE `Type` (
                        `Id` INT AUTO_INCREMENT PRIMARY KEY,
                        `Name` VARCHAR(500) NOT NULL
);

-- Insert data into the Type table
INSERT INTO Type (Name) VALUES
                            ('Tênis'),
                            ('Raquete'),
                            ('Futebol'),
                            ('Bolsa');

-- Create the Product table
CREATE TABLE `Product` (
                           `Id` INT AUTO_INCREMENT PRIMARY KEY,
                           `Name` VARCHAR(500) NOT NULL,
                           `Description` TEXT,
                           `Price` DECIMAL(10, 2) NOT NULL,
                           `PictureUrl` VARCHAR(500),
                           `ProductTypeId` INT NOT NULL,
                           `ProductBrandId` INT NOT NULL,
                           FOREIGN KEY (`ProductTypeId`) REFERENCES `Type`(`Id`),
                           FOREIGN KEY (`ProductBrandId`) REFERENCES `Brand`(`Id`)
);

-- Insert data into the Product table
INSERT INTO Product (Name, Description, Price, PictureUrl, ProductTypeId, ProductBrandId) VALUES
                                                                                              ('Tênis Adidas Quick Force Indoor Badminton', 'Projetado para jogadores de badminton profissionais e amadores. Esses calçados indoor são confeccionados com cabedal sintético que proporciona um ajuste natural, enquanto a entressola de EVA oferece amortecimento leve. Os calçados podem ser usados para Badminton e Squash', 3500, 'images/Product/adidas_shoe-1.png', 1, 1),
                                                                                              ('Tênis Adidas Quick Force Indoor Badminton', 'Projetado para jogadores de badminton profissionais e amadores. Esses calçados indoor são confeccionados com cabedal sintético que proporciona um ajuste natural, enquanto a entressola de EVA oferece amortecimento leve. Os calçados podem ser usados para Badminton e Squash', 3375, 'images/Product/adidas_shoe-2.png', 1, 1),
                                                                                              ('Tênis De Quadra Asics Indoor Gel Rocket 8', 'O Asics Gel Rocket 8 Indoor Court Shoes (Laranja/Prata) manterá você motivado e empolgado para alcançar seu melhor desempenho em vôlei, squash e outros esportes indoor. Jogadores iniciantes e intermediários têm acesso a tecnologias de ponta a um preço acessível. Este modelo de entrada possui um cabedal durável e oferece bastante estabilidade.', 4249, 'images/Product/asics_shoe-1.png', 1, 2),
                                                                                              ('Tênis De Quadra Asics Indoor Gel Rocket 8', 'O Asics Gel Rocket 8 Indoor Court Shoes (Laranja/Prata) manterá você motivado e empolgado para alcançar seu melhor desempenho em vôlei, squash e outros esportes indoor. Jogadores iniciantes e intermediários têm acesso a tecnologias de ponta a um preço acessível. Este modelo de entrada possui um cabedal durável e oferece bastante estabilidade.', 3499, 'images/Product/asics_shoe-2.png', 1, 2),
                                                                                              ('Tênis De Quadra Asics Indoor Gel Rocket 8', 'O Asics Gel Rocket 8 Indoor Court Shoes (Laranja/Prata) manterá você motivado e empolgado para alcançar seu melhor desempenho em vôlei, squash e outros esportes indoor. Jogadores iniciantes e intermediários têm acesso a tecnologias de ponta a um preço acessível. Este modelo de entrada possui um cabedal durável e oferece bastante estabilidade.', 3499, 'images/Product/asics_shoe-3.png', 1, 2),
                                                                                              ('Tênis Victor Badminton SHW503 F', 'Couro PU, Malha, EVA, ENERGY MAX, Folha de Nylon, Borracha', 2392, 'images/Product/victor_shoe-1.png', 1, 3),
                                                                                              ('Tênis Victor Badminton SHW503 F', 'Couro PU, Malha, EVA, ENERGY MAX, Folha de Nylon, Borracha', 3000, 'images/Product/victor_shoe-2.png', 1, 3),
                                                                                              ('Tênis Badminton YONEX Super Ace Light', 'Domine o jogo com Super Ace Light destacando-se pela máxima absorção de choque, recuperação rápida da compressão. Sua alta resiliência garante que as palmilhas YONEX mantenham sua forma por mais tempo. Cuidadosamente contornado para conforto. Proporciona estabilidade nas áreas do antepé e dos dedos.', 2590, 'images/Product/yonex_shoe-1.png', 1, 4),
                                                                                              ('Tênis Badminton YONEX Super Ace Light', 'Domine o jogo com Super Ace Light destacando-se pela máxima absorção de choque, recuperação rápida da compressão. Sua alta resiliência garante que as palmilhas YONEX mantenham sua forma por mais tempo. Cuidadosamente contornado para conforto. Proporciona estabilidade nas áreas do antepé e dos dedos.', 3500, 'images/Product/yonex_shoe-2.png', 1, 4),
                                                                                              ('Tênis Badminton YONEX Super Ace Light', 'Domine o jogo com Super Ace Light destacando-se pela máxima absorção de choque, recuperação rápida da compressão. Sua alta resiliência garante que as palmilhas YONEX mantenham sua forma por mais tempo. Cuidadosamente contornado para conforto. Proporciona estabilidade nas áreas do antepé e dos dedos.', 3700, 'images/Product/yonex_shoe-3.png', 1, 4),
                                                                                              ('Tênis De Críquete Puma 19 FH Rubber Spike', 'Com recursos e funções projetados para suportar longas horas em campo, esses calçados Puma one8 19 FH Rubber foram projetados para oferecer conforto aos jogadores de críquete.', 4999, 'images/Product/puma_shoe-1.png', 1, 5),
                                                                                              ('Tênis Adidas Quick Force Indoor Badminton', 'Projetado para jogadores de badminton profissionais e amadores. Esses calçados indoor são confeccionados com cabedal sintético que proporciona um ajuste natural, enquanto a entressola de EVA oferece amortecimento leve. Os calçados podem ser usados para Badminton e Squash', 3375, 'images/Product/adidas_shoe-3.png', 1, 1),
                                                                                              ('Tênis De Críquete Puma 19 FH Rubber Spike', 'Com recursos e funções projetados para suportar longas horas em campo, esses calçados Puma one8 19 FH Rubber foram projetados para oferecer conforto aos jogadores de críquete.', 5200, 'images/Product/puma_shoe-2.png', 1, 5),
                                                                                              ('Tênis De Críquete Puma 19 FH Rubber Spike', 'Com recursos e funções projetados para suportar longas horas em campo, esses calçados Puma one8 19 FH Rubber foram projetados para oferecer conforto aos jogadores de críquete.', 5700, 'images/Product/puma_shoe-3.png', 1, 5),
                                                                                              ('Sapato Masculino Badminton Babolat Shadow Spirit (Cloisonne/Strike)', 'A tecnologia desenvolvida proporciona ótima aderência e excelente absorção de choques.', 4125, 'images/Product/babolat_shoe-1.png', 1, 7),
                                                                                              ('Sapato Masculino Badminton masculinos Babolat Shadow Tour (White/Blue)', 'A tecnologia desenvolvida proporciona ótima aderência e excelente absorção de choques.', 5249, 'images/Product/babolat_shoe-2.png', 1, 7),
                                                                                              ('Sapato Feminino Babolat Shadow Team (Black/Peony)', 'A tecnologia desenvolvida proporciona ótima aderência e excelente absorção de choques. buscam vencer com rotação e potência inovadoras.', 6099, 'images/Product/yonex-racket-1.png', 2, 4),
                                                                                              ('Raquete de Tênis Yonex VCORE Pro 100 A (290gm, Encordoada)', 'Para jogadores ofensivos que buscam vencer com rotação e potência inovadoras.', 6399, 'images/Product/yonex-racket-2.png', 2, 4),
                                                                                              ('Raquete de Tênis Yonex VCORE Pro 100 2019 (280gm, Não Encordoada)', 'Para jogadores ofensivos que buscam vencer com rotação e potência inovadoras.', 13299, 'images/Product/yonex-racket-3.png', 2, 4),
                                                                                              ('Raquete de Tênis Babolat Boost D (260gm, Strung)', 'Compre a Raquete de Tênis Babolat Pure Aero 2019 Superlite (Encordoada, 255gm) e ganhe encordoamento grátis com a corda Babolat RPM Blast!!', 6999, 'images/Product/babolat-racket-1.png', 2, 7),
                                                                                              ('Raquete de Tênis Babolat Pure Aero 2019 Superlite (Não Encordoada, 255gm)', 'Compre a Raquete de Tênis Babolat Pure Aero 2019 Superlite (Não Encordoada, 255gm) e ganhe encordoamento grátis com a corda Babolat RPM Blast!!', 13000, 'images/Product/babolat-racket-2.png', 2, 7),
                                                                                              ('Raquete de Tênis Babolat Pure Drive VS (Par, 300gm, Encordoada)', 'Raquete de Tênis Babolat Pure Drive VS (Par, 300gm, Encordoada)', 34000, 'images/Product/babolat-racket-3.png', 2, 7),
                                                                                              ('Bola de Futebol Adidas FIFA World Cup 2018 OMB(Branco/Vermelho/Preto)', 'Apresentando um design inovador de painel de superfície, esta é a bola usada durante a Copa do Mundo da FIFA™. Inspirado nas paisagens urbanas da Rússia, um gráfico pixelizado presta homenagem à icônica bola Telstar. Seus designs de superfície sem costura termicamente ligados.', 2499, 'images/Product/adidas_football-1.png', 3, 1),
                                                                                              ('Bola de Futebol Adidas FIFA World Cup 2018 OMB', 'Apresentando um design inovador de painel de superfície, esta é a bola usada durante a Copa do Mundo FIFA™ de futebol. Inspirado nas paisagens urbanas da Rússia, um gráfico pixelizado presta homenagem à icônica bola Telstar. Seus designs de superfície sem costura termicamente ligados.', 3200, 'images/Product/adidas_football-2.png', 3, 1),
                                                                                              ('Bola de Futebol Adidas FIFA World Cup Top Glider', 'Apresentando um design inovador de painel de superfície, esta é a bola usada durante a Copa do Mundo da FIFA™. Inspirado nas paisagens urbanas da Rússia, um gráfico pixelizado presta homenagem à icônica bola Telstar. Seus designs de superfície sem costura termicamente ligados.', 2499, 'images/Product/adidas_football-3.png', 3, 1),
                                                                                              ('Bola de Fotebol Nike Pitch Premier League (Amarelo/Roxo)', 'Bola Nike Pitch Premier League (Amarelo/Roxo) é feita com gráficos coloridos que se destacam no campo para facilitar o acompanhamento da bola. Um revestimento de TPU costurado à máquina oferece ótimo toque e durabilidade durante o jogo.', 1525, 'images/Product/Nike-Football-1.png', 3, 6),
                                                                                              ('Bola de Futebol Nike Manchester City Supporters (Berry)', 'Bola Nike Manchester City Supporters (Berry) é feita com gráficos coloridos que se destacam no campo para facilitar o acompanhamento da bola. Um revestimento de TPU costurado à máquina oferece ótimo toque e durabilidade durante o jogo.', 1525, 'images/Product/Nike-Football-2.png', 3, 6),
                                                                                              ('Bola de Futebol Nike Mercurial Veer (Branco/Verde/Preto)', 'Bola Nike Mercurial Veer (Branco/Verde/Preto) é feita com gráficos coloridos que se destacam no campo para facilitar o acompanhamento da bola. Um revestimento de TPU costurado à máquina oferece ótimo toque e durabilidade durante o jogo.', 1450, 'images/Product/Nike-Football-3.png', 3, 6),
                                                                                              ('Bolsa para Raquetes Babolat Team Line Racket 12 (Vermelho Fluorescente)', 'A bolsa para raquetes Babolat Team Line é altamente durável e estilosa, acomodando até 12 raquetes.', 4550, 'images/Product/babolat-kitback-1.png', 4, 7),
                                                                                              ('Bolsa para Raquetes Babolat Pure Strike RH X12 (Branco/Vermelho)', 'A bolsa Babolat Pure Strike 12-Pack acomodará facilmente a maioria dos equipamentos necessários para ser bem-sucedido na quadra.', 9799, 'images/Product/babolat-kitback-2.png', 4, 7),
                                                                                              ('Bolsa para Raquetes Babolat Team Line 12 Racquet (Prata)', 'Bolsa para Raquetes Babolat Team Line 12 (Prata) para jogadores que têm tênis no sangue, a Babolat traz para você a Bolsa de Tênis Babolat Team Line Red 12 Pack.', 4550, 'images/Product/babolat-kitback-3.png', 4, 7),
                                                                                              ('Bolsa para Raquetes Yonex SUNR 4826TK BT6-SR Badminton (Preto/Vermelho/Branco)', 'Bolsa de Badminton Yonex SUNR 4826TK BT6-SR (Preto/Vermelho/Branco)', 1999, 'images/Product/yonex-kitback-1.png', 4, 4),
                                                                                              ('Bolsa para Raquetes Yonex SUNR LRB05 MS BT6 S Badminton (Azul/Vermelho)', 'Bolsa de Badminton Yonex SUNR LRB05 MS BT6 S (Azul/Vermelho)', 1499, 'images/Product/yonex-kitback-2.png', 4, 4),
                                                                                              ('Bolsa para Raquetes Yonex SUNR LRB05 MS BT6 S Badminton (Cinza/Laranja)', 'Bolsa de Badminton Yonex SUNR LRB05 MS BT6 S (Cinza/Laranja)', 1499, 'images/Product/yonex-kitback-3.png', 4, 4);
