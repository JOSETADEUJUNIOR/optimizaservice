 <?php

    require_once dirname(__DIR__, 2) . '/vendor/autoload.php'; ?>
 <!DOCTYPE html>


 <head>
     <?php include_once PATH_URL . './Template/_includes/_head.php' ?>
     
 </head>

 <body class="account-page">

 <div class="main-wrapper">
        <div class="account-content">
            <div class="login-wrapper">
                <div class="login-content">
                    <div class="login-userset">
                        <div class="login-logo">
                            <img src="../Template/assets/img/logo.png" alt="img">
                        </div>
                        <div class="login-userheading">
                            <h3>Logar</h3>
                            <h4>Por favor, insira os dados de sua conta</h4>
                        </div>
                        <div class="form-login">
                            <label>Email</label>
                            <div class="form-addons">
                                <input type="text" id="login" placeholder="Enter your email address">
                                <img src="../Template/assets/img/icons/mail.svg" alt="img">
                            </div>
                        </div>
                        <div id="form-login" class="form-login">
                            <label>Password</label>
                            <div class="pass-group">
                                <input type="password" id="senha" class="pass-input" placeholder="Enter your password">
                                <span class="fas toggle-password fa-eye-slash"></span>
                            </div>
                        </div>
                        <div class="form-login">
                            <div class="alreadyuser">
                                <h4><a href="forgetpassword.html" class="hover-a">Forgot Password?</a></h4>
                            </div>
                        </div>
                        <div class="form-login">
                            <button class="btn btn-login" onclick="return ValidarAcesso('form-login')" >Acessar</button>
                        </div>
                    </div>
                </div>
                <div class="login-img">
                    <img src="../Template/assets/img/login.jpg" alt="img">
                </div>
            </div>
        </div>
    </div>
     <script src="../Template/assets/js/jquery-2.1.4.min.js"></script>

     <?php include_once '../Template/_includes/_scripts.php' ?>



     <script src="../Resource/ajax/perfil-ajx.js"></script>

     <!-- <![endif]-->

     <!--[if IE]>
<script src="assets/js/jquery-1.11.3.min.js"></script>
<![endif]-->
    
 </body>

 </html>