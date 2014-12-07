import math
import csv

# absorve dados de lat/long e transforma em WKT usada abaixo
def latlon2wkt(lat,long) :
    half_circ = 20037508.34
    x = long * half_circ /180
    y = math.log(math.tan((90 + lat) * math.pi / 360)) / (math.pi / 180)
    y = y * half_circ / 180
    return "GEOMETRYCOLLECTION(POINT("+str(x)+" "+str(y)+"))"


# pede nome do arquivo CSV para leitura, arquivo deve ter uma entrada para latitude, longitude por linha, seguindo esse formato:
# -22.814914,-47.091363
# -22.898138,-47.076776
# ...
# ...
entra = raw_input("\n Digite o nome do arquivo CSV e pressione <enter> --> ")
arq_cvs = csv.reader(open(entra,'rb'),delimiter=',',quotechar='"')


# gera uma lista (matrix) para organizar dados
lista_cvs = list(arq_cvs)

# converte os dados
for i in range(0,len(lista_cvs)):
	lista_cvs[i][0] = latlon2wkt(float(lista_cvs[i][0]),float(lista_cvs[i][1]))
	lista_cvs[i].pop(1)


# pede nome do arquivo CSV para salvar dados em WKT
saida = raw_input("\n Digite o nome do arquivo para salvar dados WKT e pressione <enter> --> ")
result = open(saida,'wb')
writer=csv.writer(result,dialect='excel')
headings=writer.writerows(lista_cvs)
result.close()
