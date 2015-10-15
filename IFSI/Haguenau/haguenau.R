# =============================================
#
#      slurp
#
#===============================================
#
#' @title Concatène deux ou plusieurs fichiers
#' @description fusionne deux ou plusieurs fichiers de type text (csv) ayant le même nombre de colonne
#' Par défaut header = FALSE ce qui permet de fusionner des fichiers dont les noms de colonnes diffèrenet.
#' @usage slurp(path = "./", pattern = ".csv", header = FALSE)
#' @param path chemin vers le dossier contenant les fichiers à fusionner. NE PAS OUBLIER LE '/' FINAL
#' @param pattern suffixe des fichiers à fusionner (csv par dédaut)
#' @return un dataframe de fichiers fusionnés
#' @examples data <- slurp("IFSI/Haguenau/Data/") 
#' @export
#' 
slurp <- function(path = "./", pattern = ".csv", header = FALSE){
        out.file <- NULL
        file.names <- dir(path, pattern = pattern) # seuls les fichiers se terminant par csv sont lus
        for(i in 1:length(file.names)){
                file <- read.table(paste(path, file.names[i], sep=""), header= header, sep=",", stringsAsFactors=FALSE)
                out.file <- rbind(out.file, file)
        }
        
        write.table(out.file, file = "samu_archive.csv", sep=",", row.names = FALSE, qmethod = "double",fileEncoding="utf-8")
        return(out.file)
}