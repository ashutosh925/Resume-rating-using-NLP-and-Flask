# Resume_project
Sorting of resumes according to job description using natural language processing.

DESCRIPTION:
    Comparision of text is done between JobDescription(.txt) file and bunch of resumes(.pdf) using natural language processing. Two python files resume.py and flask_old.py(which uses flask) are used in this project. Flask is a python web framework which uses python decorators. They help in calling a function before the user's request is processed.
    
REQUIREMENTS:
    Python 3.7.3 is used in this project. In addition to python following libraries are required to run the code. For resume.py code slate3K, re, logging, sklearn, pathlib, operator are required. For flask_old.py flask, werkzeug, os, pathlib, re, resume(i.e., resume.py) are used. pip3 can be used to downlaod the packages which are not available after python installation. slate3K, sklearn, flask, pathlib are not available so then can be installed by using pip3. Example:: 
pip3 install sklearn.
    
NOTE::
Since the JobDescription and resumes after uploading will be stored in local machine, before running flask_old.py change the lines 12 and 14 which contains variables app.config['UPLOAD_RESUME'] and app.config['UPLOAD_JD'] that holds resumes path, JobDescription path respectively after uploading. Change the paths according to your desired location.
    

WORKING:
    In order to use flask framework, it should be running in background. So first run the flask_old.py code. It displays a link http://127.0.0.1:5000/. Click the link. If the link is not displayed type the link in any browser to open. Here 127.0.0.1 represents localhost and 5000 represents port number. If the port number 5000 is already in use then change the port number explicitly in the code. Then upload the resumes and jobDescription files which will be stored in local machine(please check the NOTE below) and click compare button. After clicking compare button it takes some time depending upon the number of resumes uploaded, list of the names and scores will be appeared in tabular form. Clicking the names will redirect to file's path.
    
CREDITS:
    Author: Swaroop Bayya
    Contributors: Hemanth Yamijala
