ECHO Fazendo bkp do banco bd_site e salvando na pasta na area de trabalho 
c:
cd "C:\Users\rubens\Desktop"
md backup
c:
cd "C:\Program Files\MySQL\MySQL Server 5.7\bin" 
mysqldump -u root -p db_site > c:\Users\rubens\Desktop\backup\db_site.sql 

