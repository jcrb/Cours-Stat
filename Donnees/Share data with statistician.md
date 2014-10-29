Comment partager des données avec un statisticien
===========

Ceci est un guide pour ceux qui ont besoin de partager des données avec un statisticien. Les publics cibles que j'ai en tête sont:

* Les collaborateurs scientifiques qui ont besoin de statisticiens pour analyser les données pour les
* Les étudiants ou les stagiaires postdoctoraux dans les disciplines scientifiques en quête de conseils d'experts-conseils
* les étudiants débutants en statistiques dont le travail est de rassembler / nettoyer des ensembles de données.


Les objectifs de ce guide sont de fournir des instructions sur la meilleure façon de partager des données pour éviter les pièges les plus courants et les sources de retard dans la transition entre la collecte des données et l'analyse des données.
Le [Leek group](http://biostat.jhsph.edu/~jleek/) travaille avec un grand nombre de collaborateurs et la première source de variabilité dans la course aux résultats est l'état des données quand elles arrivent au niveau du groupe Leek. Sur la base de mes échanges avec d'autres statisticiens cela est vrai presque universellement.

Mon sentiment fort est que les statisticiens doivent être capables de gérer les données dans l'état où elles arrivent. Il est important de voir les données brutes, de comprendre les étapes du circuit du traitement, et être en mesure d'intégrer des sources cachées de variabilité dans l'analyse des données dans l'analyse. D'autre côté, pour de nombreux types de données, les étapes de traitement sont bien documentées et normalisé. Ainsi, le travail de conversion des données de la forme brute vers une forme directement analysable peut être effectuée avant d'appeler sur un statisticien. Cela peut considérablement accélérer le temps de traitement, car le statisticien n'a pas à faire tout le prétraitement des données. 


Ce que vous devez fournir au statisticien
====================


Pour une vitesse maximale de l'analyse quelles sont les informations que vous devez passer à un statisticien:

1. Les données brutes.
2. un ensemble de données ordonné[tidy data] (http://vita.had.co.nz/papers/tidy-data.pdf)
3. Un lexique décrivant chaque variable et ses valeurs possibles dans l'ensemble de données bien rangé.
4. La recette explicite et exacte que vous avez utilisé pour passer de 1 -> 2,3

Regardons chaque partie de l'ensemble de données que vous allez transférer.

For maximum speed in the analysis this is the information you should pass to a statistician:


### Les données brutes

Il est essentiel que vous incluiez la forme la plus brute des données auxquelles vous avez accès. Voici quelques exemples de forme brute des données:

* Le [fichier binaire] étrange (http://en.wikipedia.org/wiki/Binary_file) votre machine de mesure crache
* Le fichier Excel non formaté avec 10 feuilles de travail de l'entreprise que vous avez contracté vous a envoyé
* Le [JSON] (http://en.wikipedia.org/wiki/JSON) données compliqué vous avez obtenu de [API Twitter] (https://twitter.com/twitterapi)
* Les chiffres saisis à la main que vous avez collectées en regardant à travers un microscope

Les données brutes sont au bon format si: 

1. Ran no software on the data
1. Did not manipulate any of the numbers in the data
1. You did not remove any data from the data set
1. You did not summarize the data in any way

If you did any manipulation of the data at all it is not the raw form of the data. Reporting manipulated data as raw data is a very common way to slow down the analysis process, since the analyst will often have to do a forensic study of your data to figure out why the raw data looks weird. 

### The tidy data set

tidy = rangé, ordonné, utilisable.
messy, messiness = malpropre, désordre

Les principes généraux des tidy data ont été énoncé par [Hadley Wickham](http://had.co.nz/) dans [this paper (http://vita.had.co.nz/papers/tidy-data.pdf) et dans cette [vidéo](http://vimeo.com/33727555). 
Le papier et la vidéo sont focalisé sur le logiciel[R](http://www.r-project.org/) cependant ces principes sont universels:

1. chaque variable mesurée doit figurer dans une colonne
2. Chaque observation différente d'une variable doit figurer sur une ligne différente 
3. There should be one table for each "kind" of variable
1. If you have multiple tables, they should include a column in the table that allows them to be linked

Messy data:
- les entête de colonne contiennent des chiffres au lieu de lettres
- des variables multiples stockées dans la même colonne
- les variables sont stockées en lignes et en colonnes

Les outils pour faire le ménage
- reshape2 (melt, dcast)
- stringr (str_replace, str_sub, str_match, str_split_fixed
- plyr (arrange)
regarder la video supra

While these are the hard and fast rules, there are a number of other things that will make your data set much easier to handle. 

First is to include a row at the top of each data table/spreadsheet that contains full row names.  So if you measured age at diagnosis for patients, you would head that column with the name `AgeAtDiagnosis` instead of something like `ADx` or another abbreviation that may be hard for another person to understand. 


Here is an example of how this would work from genomics. Suppose that for 20 people you have collected gene expression measurements with 
[RNA-sequencing](http://en.wikipedia.org/wiki/RNA-Seq). You have also collected demographic and clinical information
about the patients including their age, treatment, and diagnosis. You would have one table/spreadsheet that contains the clinical/demographic
information. It would have four columns (patient id, age, treatment, diagnosis) and 21 rows (a row with variable names, then one row
for every patient). You would also have one spreadsheet for the summarized genomic data. Usually this type of data
is summarized at the level of the number of counts per exon. Suppose you have 100,000 exons, then you would have a
table/spreadsheet that had 21 rows (a row for gene names, and one row for each patient) and 100,001 columns (one row for patient
ids and one row for each data type). 

If you are sharing your data with the collaborator in Excel, the tidy data should be in one Excel file per table. They
should not have multiple worksheets, no macros should be applied to the data, and no columns/cells should be highlighted. 
Alternatively share the data in a [CSV](http://en.wikipedia.org/wiki/Comma-separated_values) or [TAB-delimited](http://en.wikipedia.org/wiki/Tab-separated_values) text file.


### Le lexique (code book)


Pour presque tout les ensembles de données , les mesures qui sont faites devront être décrites avec plus de détail que ce qui figure 
dans la feuille de calcul . Le lexique contient ces informations . Au minimum, il devrait contenir :

1. Informations sur les variables ( y compris les unités !) dans les données ne contenant pas d'éléments ordonnés
2. Informations sur les choix qui ont été faits
3. Informations sur le protocole de l'étude 

Dans notre exemple, la génomique , l'analyste voudrait savoir quelles sont les unité de mesure pour chaque
variables cliniques / démographique ( âge en années , le traitement par nom / dose , le nombre de diagnostic et le niveau d'hétérogéniité ) .
Ils voudrait aussi savoir comment vous avez choisi les exons que vous avez utilisé pour résumer les données génomiques ( UCSC / Ensembl , etc.) 
ils voudrait aussi savoir toute autre information sur la façon dont vous avez conçus l'étude et organisé la collecte de données. Par exemple, sont -ce les 20 premiers patients qui marchait dans la clinique ? Sont-ils 20 patients très sélectionnés par certaines caractéristiques comme l'âge ? Les traitements sont -ils attribués au hasard ?

Le format habituel pour ce document est un fichier type Word . Il devrait y avoir une section intitulée « Conception de l'étude " qui décrit de façon détaillée la façon dont vous avez recueilli les données . Il ya une section intitulée « codage» qui décrit chaque variable et ses unités .

### Comment coder les variables


Lorsque vous mettez des variables dans une feuille de calcul, il y a quelques grandes catégories en fonction de leur nature [data type](http://en.wikipedia.org/wiki/Statistical_data_type):

1. Continuous
1. Ordinal
1. Categorical
1. Missing 
1. Censored

**variables continues** 
concernent toute variable mesurée sur une échelle quantitative continie comme par exemple le poids mesuré en kg.

**variables ordinales**(http://en.wikipedia.org/wiki/Ordinal_data) sont des variables réparties en niveaux, en nombre limité  (< 100) Ces niveaux sont ordonnés. Par exemple une échelle de réponse (Likert): mauvais, passable, bon.

**variables catégorielles** [Categorical data](http://en.wikipedia.org/wiki/Categorical_variable) sont des variables où il existe plusieurts catégories, mais qui ne sont pas ordonnées. L'exemple classique est le sexe: homme ou femme.

** données manquantes** [Missing data](http://en.wikipedia.org/wiki/Missing_data) sont des données manquantes et irrécupérables. Elles sont codées avec le symbole NA (not avalaible).

**données censurées** [Censored data](http://en.wikipedia.org/wiki/Censoring_(statistics\)) sont des données manquantes mais ont sait 
pourquoi. Des exemples courants sont une mesure inférieure à une limite de détection ou un patient perdu de vue. Ils doivent aussi être codés `NA` quand vous n'avez pas les données. Mais vous devriez également ajouter une nouvelle colonne à vos données appelé, "VariableNameCensored" qui devrait avoir des valeurs de `true` si censuré et `false` si pas. Dans le lexique, vous devez expliquer pourquoi ces valeurs soient manquantes. Il est absolument essentiel de mentionner à l'analyste, si il ya une raison que vous connaissez pour que ces  certaines données sont manquantes. 
Vous ne devriez pas jeter observations manquantes [impute](http://en.wikipedia.org/wiki/Imputation_(statistics\))/make up/.

[data measurement](http://www.wikiwand.com/en/Level_of_measurement) +++

En général, essayez d'éviter de codage variables catégorielles ou ordinales comme des nombres. Lorsque vous entrez la valeur pour le sexe, il devrait être «homme» ou «femme». Les valeurs ordinales dans le jeu de données doivent être "mauvais", "passable", "bon" et non 1, 2, 3.
Cela permettra d'éviter les ambiguités potentielles  et aidera à identifier les erreurs de codage.

Toujours encoder chaque élément d'information à propos de vos observations en utilisant le format texte. Par exemple, si vous stockez des données dans Excel et utilisez un texte en couleur ou un fond de cellule coloré pour indiquer une information sur une observation ("les variables rouges ont été observés dans l'expérience 1."), Cette information ne sera pas exporté (et sera perdue!) lorsque les données sont exportées sous forme de texte brut. Chaque élément de données doit être codé sous forme de texte qui puisse être exporté.

### The instruction list/script

Vous avez peut-être entendu cela avant [ la reproductibilité est une challenge dans la science informatique ] ( http://www.sciencemag.org/content/334/6060/1226 ) .
Cela signifie que, lorsque vous soumettez votre papier , les rewievers et le reste du monde devrait être en mesure de reproduire exactement les analyses à partir des données brutes et aboutir aux mêmes résultats. Si vous essayez d'être efficace , vous aurez probablement à effectuer un traitement des données avant que les données puisent être considérées comme utilisables.

L'idéal pour vous lors de l'écriture d'un résumé est de créer un script informatique ( dans ` R `, ` Python ` , ou autre chose )
qui prend les données brutes en entrée et produit les données nettoyées en sortie. Ce sont ces données nettoyées qui pourront être partagées (tidy = nettoyé). 
Vous pouvez essayer d'exécuter votre script un couple de fois et vérifier que le code produit le même résultat .

Dans de nombreux cas , la personne qui a recueilli les données est incité à les nettoyer pour accélérer le traitement par un statisticien. Ils ne savent pas comment coder dans un langage de script . Dans ce cas , ce que vous devez fournir au statisticien
est quelque chose qui s'appelle [ pseudocode ] ( http://en.wikipedia.org/wiki/Pseudocode ) . Il devrait ressembler à quelque chose comme :

1. Étape 1 - prendre le fichier brut , lancer la version 3.1.2 du logiciels de résumé avec des paramètres a = 1 , b = 2 , c = 3
2. Étape 2 - exécuter le logiciel séparément pour chaque échantillon
3. Étape 3 - prendre la troisième colonne de outputfile.out pour chaque échantillon et c'est la ligne correspondante dans le jeu de données de sortie

Vous devez également inclure des informations sur les système ( Mac / Windows / Linux ) vous utiliserez le logiciel sur les données et vous vérifierz que les résultats sont identiques. Idéalement une autre personne doit pouvoir reproduire les résultas  avec le même jeu de données.  



What you should expect from the analyst
====================

When you turn over a properly tidied data set it dramatically decreases the workload on the statistician. So hopefully
they will get back to you much sooner. But most careful statisticians will check your recipe, ask questions about
steps you performed, and try to confirm that they can obtain the same tidy data that you did with, at minimum, spot
checks.

You should then expect from the statistician:

1. An analysis script that performs each of the analyses (not just instructions)
1. The exact computer code they used to run the analysis
1. All output files/figures they generated. 

This is the information you will use in the supplement to establish reproducibility and precision of your results. Each
of the steps in the analysis should be clearly explained and you should ask questions when you don't understand
what the analyst did. It is the responsibility of both the statistician and the scientist to understand the statistical
analysis. You may not be able to perform the exact analyses without the statistician's code, but you should be able
to explain why the statistician performed each step to a labmate/your principal investigator. 


Contributors
====================

* [Jeff Leek](http://biostat.jhsph.edu/~jleek/) - Wrote the initial version.
* [L. Collado-Torres](http://bit.ly/LColladoTorres) - Fixed typos, added links.
* [Nick Reich](http://people.umass.edu/nick/) - Added tips on storing data as text.

voir aussi: [leek on github](https://github.com/jtleek/dataanalysis)


Exel, fanaticism and R
======================
source: http://www.quantumforest.com/2013/exel-fanaticism-and-r/

Faut-il utiliser un tableur ou un logiciel de statistiques pour exploiter des données ?
Réponse: les deux !
Les tableurs sont parfaitement adaptés à la saisie et corrections simples des données. Par contre ce sont de mauvais logiciels pour faire des statistiques et de manière générale pour gérer un projet de recherche.
Les logiciels de stat sont mal adaptés à la saisie des données mais savent très bien manipuler les tableaux de données.
La communication entre les deux types de logiciel se fait en utilisant un format universel de fichier appelé CSV (comma separated virgule = données séparées par une virgule) [http://fr.wikipedia.org/wiki/Comma-separated_values].

Cependant un certain nombre de règles sont à respecter pour que les données soient exploitables. La feuille de saisie est divisée en 3 zones horizontales:
- la première, facultative, sert à stocker les métadonnées [http://fr.wikipedia.org/wiki/M%C3%A9tadonn%C3%A9e]
- la seconde stocke le nom des colonnes
- la troisième contient les données proprement dites
La troisième zone est divisée verticalement en 2:
- les colonnes les plus à gauche contiennent les variables de type "facteur" (factorielles)
- les colonnes les plus à droite contiennent les mesures

**métadonnées** ce sont des données à propos des données. Elles servent à comprendre le contexte dans lequel se fait l'étude: nom de l'auteur des investigateurs, version du questionnaire, méthodes de description des variables: 'pour la rubrique sexe préciser H ou F'. Cette zone est facultative ou faire l'objet d'un document séparé

**nom des colonnes** formée d'une seule ligne. Sert à stocker le nom opérationnel des colonnes. Règles:
- le nom est succint (5 caractères)
- il ne doit pas contenir d'espace ou de caractères qui pourrait être mal interprété (,;/\)
- remplacer les espace par des underscore
- pas de caractères accentués  
**mesures**
- toujours utiliser le point décimal (jamais la virgule)
- une colonne ne peut contenir que des chiffres ou du texte, jamais des deux.

Data mining with Rattle and R
=============================
Visicalc [http://fr.wikipedia.org/wiki/VisiCalc]
--------
Visicalc est le premier logiciel tableur destiné à un ordinateur individuel. C'est très certainement l'exemple même d'une killer app qui fit du micro-ordinateur (qui était jusque-là un hobby réservé aux programmeurs) un véritable outil destiné à des applications comptables et commerciales. Le nom semble inspiré de Visifile, qui avait été un grand succès en permettant de rendre enfin les fichiers lisibles sans programme spécialisé pour chacun d'eux.

Conçu par Dan Bricklin, amélioré par Bob Frankston1, développé par leur compagnie Software Arts et distribué par Personal Software Inc. en 1979 pour l'Apple II, cette application transforma les machines d'Apple en véritables outils de production.

Cette invention motiva très probablement l'entrée d'IBM sur le marché des micro-ordinateurs, marché qu'ils ignoraient jusque-là.

Selon Bricklin, l'idée de la création du tableur lui vint pendant ses études à Harvard, en voyant son professeur corriger manuellement ses tableaux de calculs. Il réalisa alors qu'il pouvait automatiser ces procédures par un moyen informatique.

Les brevets logiciels datant de 1982 aux États-Unis, l'innovation fut uniquement protégée par copyright (comme beaucoup de logiciels).

Le logiciel a par la suite inspiré les créateurs de Lotus 1-2-3 et de MultiPlan.

Chapitre 3: working with data
-----------------------------
**data mining** = fouille de données, exploration de données, extraction de données.
Le DM ne traite que des données numériques et catégorielles (et pas des autres données comme le son, l'image, video, textes...). 

**data warehouse** = entrepôt de données.

**data base** = base de données

**statistical learning** = ce que peuvent nous apprendre les données, comprendre les données

Tout travail de recherche consiste à un moment donné à rassembler des données. Cette tache apparemment simple représente en général 70 à 90% du temps consacré à un projet. Elle ne doit pas être sous estimée.
Rassembler des données c'est aussi préciser:
- la provenance: source et le but
- l'exactitude et la fiabilité
- permissions et respect de la vie privée
Les données sont collectées à des fins différentes et sont le support d'informations différhttp://fr.wikipedia.org/wiki/VisiCalcentes mais stockées sur un support unique, source de confusion.

**dataset** = ensemble de données, fichier, feuille de cascul, tableur
Format rectangulaire, en langage mathématique *matrice*, en terme de base données *table*, en langage de tableur *feuille de calcul*

Un dataset est habituellement un tableau constitué de **lignes** et de **colonnes**. Une ligne contient une **observation**, tandis que chaque colonne correspond à une **variable**.

**observation** = entité, ligne, enregistrement, objets

**variable** = champs, colonne, attributs, caractéristiques. On distingue
- **input variables** = variable d'entrée, variables mesurées, prédicteurs, covariables ou <u>variables indépendantes</u>, qui s'imposent à l'observateur. Elles sont généralement notées X1, X2, X3...
-** output variables** = variables de sortie, cible, réponse, <u>variables dépendantes</u>. Ce sont des variables qui sont *influencées* par les variables d'entrée. Elles sont généralement notées Y1, Y2, Y3...

En statistique on essaie de mesurer les variables (statistique descriptive), d'établir s'il existe un lien entre des variables d'entrées et de sortie, si ce lien est du au hasard ou non et si on peut établie un modèle (modélisation)qui partant des premières permet de retrouver les secondes

- **identifants** ce sont de variables qui ne participent pas à l'analyse mais qui servent uniquement à identifier de manière unique et non ambiguë chaque observation (n° d'ordre).

Les variables stockent différents type de données:
- données qualitatives (nom, qualité d'un objet) ou *nominales*sont représentés par des chaines de caractères: sexe(homme, femme), couleur, les sentiments ou opinions (pas d'accord du tout, plutot pas d'accord, neutre, plutot d'accord, tout à fait d'accord), etc. On les divises en:
    - variables catégorielles: ne peut prendre qu'une valeur et une seule au sein d'une liste finie de valeurs (variable discrète), par exemple le sexe. L'ordre des variables n'intervient pas. Un cas particulier sont les variables binaires (vrai, faux).
    - variables ordinales sont des variables catégorielles ordonnées où les catégories sont mutuellement exclusives et possèdent un lien hiérarchique entre elles, sans que ce lien puisse être quantifié. Les items de type Likert entrent dans cette catégorie. Par exemple une échelle d'anxiété allant de 1 (pas du tout anxieux) à 7 (extrêmement anxieux).Les échelons ne sont pas équidistant: un score de 6 traduit une anxiété plus grande qu'un score à 3 mais une anxiété deux fois plus importante.
    - variables de type intervalles sont des variables ordinales dont les échelons sont équidistants: thermomètre. Une échelle de likert (échelle composite constituée d'un ensemble d'items de Likert), le score de glasgow, entrent dans cette catégorie (polémique persistante).
    - ratios: ce sont des intervalles possédant un zéro invariant comme la température en degré kelvin. L'age peut entrer dans cette catégorie (quoique le point de départ soit contreversé: conception, naissance).
 
Les variables quantitatives ou numériques sont celles qui se mesurent avec des chiffres. Les variables quantitatives peuvent être discrètes (age) ou continues (poids). On peut discréditer des variables continues, l'inverse n'est plus difficile (date en secondes).

Cependant les frontières entre les variables ne sont pas infranchissables: l'age par exemple peut être considéré comme une var quantitative ou qualitative (catégorielle) selon les circonstances.

Un **ensemble de données** est formé d'**observations** enregistrées sous formes de **variables** que l'on peut diviser en 2 groupes (**dépendantes** et **indépendantes**) chacune pouvant s'exprimer sous forme **catégorielle** ou **numérique**.