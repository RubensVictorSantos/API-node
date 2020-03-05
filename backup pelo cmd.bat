ECHO Fazendo bkp do banco bd_api e salvando na pasta na area de trabalho 
c:
cd "C:\Users\rubens\Desktop\pessoal\node\"
md backup
c:
cd "C:\Program Files\MySQL\MySQL Server 5.7\bin" 
mysqldump -u root -p db_api > c:\Users\rubens\Desktop\pessoal\node\backup\db_newsite.sql 

