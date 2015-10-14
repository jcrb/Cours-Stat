Nettoyer ses données
========================================================

Ce document regroupe les technniques utiles pour nettoyer les données brutes.

DataCombine
===========
date: 7/12/2013  
source: http://christophergandrud.blogspot.fr/2013/12/three-quick-and-simple-data-cleaning.html
package existe dans Cran, installation OK

méthode | description  
--------|------------  
DropNA  | Drop rows from a data frame with missing values on a given variable(s).  
FillIn	| A function for filling in missing values of a variable from one data frame with the values from another variable.  
FindReplace	| Replace multiple patterns found in a character string column of a data frame  
grepl.sub | 	Subset a data frame if a specified pattern is found in a character string  
MoveFront |	Move variables to the front of a data frame.  
rmExcept	| Remove all objects from a workspace except those specified by the user.  
shift	| A function for creating lag and lead variables.  
slide	| A function for creating lag and lead variables, including for time-series cross-sectional data.  

lag = retard, lead = avance. Pour les séries chronologiques, *slide* crée une copie du vecteur original en retardant ou en avançant les valeurs de *t* unités. Les valeurs qui dépasseraient les limites du vecteur initial sont remplacées par *NA*.


```r
# Create time variable
Year <- 1980:1999

# Dummy covariates
A <- B <- 1:20

Data1 <- data.frame(Year, A, B)

head(Data1)
```

```
##   Year A B
## 1 1980 1 1
## 2 1981 2 2
## 3 1982 3 3
## 4 1983 4 4
## 5 1984 5 5
## 6 1985 6 6
```

```r

# Now let's lag the A variable by one time unit.

library(DataCombine)

DataSlid1 <- slide(Data1, Var = "Year", slideBy = 2)

head(DataSlid1)
```

```
##   Year A B Year2
## 1 1980 1 1  1982
## 2 1981 2 2  1983
## 3 1982 3 3  1984
## 4 1983 4 4  1985
## 5 1984 5 5  1986
## 6 1985 6 6  1987
```

```r

DataSlid1 <- slide(DataSlid1, Var = "A", slideBy = -1)

head(DataSlid1)
```

```
##   Year A B Year2 A-1
## 1 1980 1 1  1982  NA
## 2 1981 2 2  1983   1
## 3 1982 3 3  1984   2
## 4 1983 4 4  1985   3
## 5 1984 5 5  1986   4
## 6 1985 6 6  1987   5
```


