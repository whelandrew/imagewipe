import React, { Component } from "react";

class DropBoxLogin extends React.Component 
{

	render() {
		return (
		<div id="page-header" class="">
   <div id="inner-page-header">
      <span class="home-icon-container">
         <div id="home-icon"><a href="/"><img data-js-component-id="component2094695769983672184" width="36" alt="Dropbox" src="https://cfl.dropboxstatic.com/static/images/logo_catalog/blue_dropbox_glyph_m1-vflZvZxbS.png" /></a></div>
      </span>
   </div>
</div>
<div class="auth-connect auth-connect">
   <div id="login-content">
      <img src="https://uc33abbb2ed87aa2212a75d98240.previews.dropboxusercontent.com/p/thumb/AAz8e2I9RP6mz9oNzG_ypnz5lo0j_8A_c2DyCz_VFLVOM0ctQSFoLK53yHiceDW3oHnlRIfavIo0W-21N18FKBeEYWlb-R9DH-eIesuyukgew3v7t1U4nT3Njam8eJXtNmyVPLLtY8GkGcQoDWlKFPM3y8NCBiwoyZYvTBxYtjewlGrxrrfvuBacDOxRqiqh-YREDU8ENfH_0U9TGHF48zd8_B1bU3H9xOkGttB_gZKK-5PVseDgU-1-iLTMhtggZwWz36IcLGgrw1yScZbf6DuENi4GindTqEj-dK2CyZ8ntHgawiqpZ6HChEXSRla7N_-BHsCRQKYDtVXlkSrXjEsJ/p.jpeg" alt="" class="connect-app-icon" />
      <div class="login-part">
         <div class="login-header">Sign in to Dropbox to link with <span class="app-name">Kroms Image Slider</span></div>
         <div data-js-component-id="component2094695769983672186" id="pyxl2094695769983672185" class="login-form-container standard login-form-hide-remember-me">
            <div id="regular-login-forms">
               <div style="" class="login-form-container--subcontainer">
                  <div>
                     <div class="login-form-container__google-div">
                        <button disabled="True" data-is-popup="false" class="auth-google button-primary">
                           <div class="sign-in-text">Sign in with Google</div>
                        </button>
                        <div class="c-card c-card--error u-l-dn google-login-error">Oops! We couldn’t find a Dropbox account matching that email. <a class="third-party-signup-link">Click here to create one.</a></div>
                     </div>
                     <div class="hr-label"><span class="hr-label__text">or</span></div>
                  </div>
                  <form action="/ajax_login" novalidate="" method="POST" class="clearfix credentials-form login-form">
                     <input type="hidden" name="cont" value="https://www.dropbox.com/oauth2/authorize?client_id=h9fot2c8bxz7gcg&amp;response_type=code" /><input type="hidden" name="require_role" /><input type="hidden" name="refresh_token" value="" /><input type="hidden" name="email_sig" value="" />
                     <div class="credentials-form__fields">
                        <div data-js-component-id="component2094695769983672189" tabindex="-1" id="pyxl2094695769983672187" class="login-email text-input login-text-input standard">
                           <div class="text-input-error-wrapper">
                              <form:error name="login_email" />
                              <div data-error-field-name="login_email"></div>
                           </div>
                           <div class="text-input-wrapper"><input class="text-input-input autofocus" type="email" name="login_email" id="pyxl2094695769983672188" /> <label style="" for="pyxl2094695769983672188">Email</label></div>
                           <small class="secondary-label"></small>
                        </div>
                        <div data-js-component-id="component2094695769983672192" tabindex="-1" id="pyxl2094695769983672190" class="text-input login-password login-text-input standard">
                           <div class="text-input-error-wrapper">
                              <form:error name="login_password" />
                              <div data-error-field-name="login_password"></div>
                           </div>
                           <div class="text-input-wrapper">
                              <input type="password" id="pyxl2094695769983672191" name="login_password" class="password-input text-input-input" /> <label style="" for="pyxl2094695769983672191">Password</label>
                              <div class="password-caps-indicator">Caps lock is currently on</div>
                           </div>
                           <small class="secondary-label"></small>
                        </div>
                     </div>
                     <div class="recaptcha-v2-challenge-container recaptcha-v2-challenge-container--invisible">
                        <div class="recaptcha-terms-text">This page is protected by reCAPTCHA, and subject to the Google<a href="https://www.google.com/policies/privacy/" target="_blank" rel="noreferrer"> Privacy Policy </a>and<a href="https://www.google.com/policies/terms/" target="_blank" rel="noreferrer"> Terms of Service</a>.</div>
                        <div class="text-input-error-wrapper">
                           <form:error name="recaptcha_response" />
                           <div data-error-field-name="recaptcha_response"></div>
                        </div>
                        <div class="recaptcha_v2_challenge" id="pyxl2094695769983672193"></div>
                     </div>
                     <div>
                        <div class="sso-description">
                           <div class="sprite-div">
                              <div class="sprite-frame small icon-left"><img src="https://cfl.dropboxstatic.com/static/images/icons/icon_spacer-vflN3BYt2.gif" alt="" class=" sprite sprite_web s_web_lock" /></div>
                              <div class="sprite-text">
                                 <div class="sprite-text-inner">Single sign-on enabled</div>
                              </div>
                           </div>
                        </div>
                        <button disabled="True" type="submit" class="login-button signin-button button-primary">
                           <div class="sign-in-text">Sign in</div>
                           <div class="sso-text">Continue</div>
                        </button>
                        <span class="login-loading-indicator"><img data-js-component-id="component2094695769983672194" src="https://cfl.dropboxstatic.com/static/images/icons/ajax-loading-small-vfl3Wt7C_.gif" alt="" data-hi-res="https://cfl.dropboxstatic.com/static/images/icons/ajax-loading-small@2x-vflAxdZTP.gif" /></span>
                     </div>
                     <div class="sso-optout">
                        <div>or <a href="#">Log in with Dropbox credentials</a></div>
                     </div>
                     <div class="login-need-help"><a href="/forgot">Forgot your password?</a></div>
                  </form>
               </div>
               <form action="/ajax_verify_code" style="display:none;" method="POST" class="two-factor-form clearfix 2fa-phone-form ">
                  <input type="hidden" name="cont" value="https://www.dropbox.com/oauth2/authorize?client_id=h9fot2c8bxz7gcg&amp;response_type=code" /><input type="hidden" name="require_role" /><input type="hidden" name="remember_me" />
                  <div class="login-info two-factor-uses-sms">We sent a code to your phone number ending in <span class="last-two-digits">**</span>.</div>
                  <div class="login-info two-factor-uses-authenticator">Enter the code generated by your authenticator app.</div>
                  <div class="login-info two-factor-uses-other-authentication"><span class="2fa-code-sent-location"></span></div>
                  <div class="inline-input-submit-pair backup-verification-code-form">
                     <div data-js-component-id="component2094695769983672197" tabindex="-1" id="pyxl2094695769983672195" class="inline-input text-input login-text-input standard">
                        <div class="text-input-error-wrapper">
                           <form:error name="code" />
                           <div data-error-field-name="code"></div>
                        </div>
                        <div class="text-input-wrapper"><input name="code" class="text-input-input autofocus" autocomplete="off" type="text" id="pyxl2094695769983672196" /> <label style="" for="pyxl2094695769983672196">6-digit code</label></div>
                        <small class="secondary-label"></small>
                     </div>
                     <button type="submit" class="mc-button mc-button-primary inline-submit">Enter</button>
                  </div>
                  <div class="two-factor-need-help"><a href="" class="resend-two-factor-code two-factor-uses-sms">Resend code</a><a href="/twofactor_recovery?cont=https%3A%2F%2Fwww.dropbox.com%2Foauth2%2Fauthorize%3Fclient_id%3Dh9fot2c8bxz7gcg%26response_type%3Dcode" class="twofactor_recovery_url">Having trouble getting a code?</a></div>
               </form>
               <form action="/ajax_verify_code" style="display:none;" method="POST" class="two-factor-form clearfix 2fa-seckey-form ">
                  <input type="hidden" name="cont" value="https://www.dropbox.com/oauth2/authorize?client_id=h9fot2c8bxz7gcg&amp;response_type=code" /><input type="hidden" name="require_role" /><input type="hidden" name="remember_me" /><input type="hidden" name="u2f_challenge" value="" />
                  <div class="login-info two-factor-uses-u2f">
                     <img data-js-component-id="component2094695769983672198" src="https://cfl.dropboxstatic.com/static/images/security_keys/insert-vflkCfC4_.png" data-hi-res="https://cfl.dropboxstatic.com/static/images/security_keys/insert@2x-vflTxG2RJ.png" alt="" class="seckey-insert" />
                     <div class="two-factor-seckey-instructions">
                        <p><span style="font-weight:bold">Insert your security key to use it</span> <img data-js-component-id="component2094695769983672199" src="https://cfl.dropboxstatic.com/static/images/icons/ajax-loading-small-vfl3Wt7C_.gif" data-hi-res="https://cfl.dropboxstatic.com/static/images/icons/ajax-loading-small@2x-vflAxdZTP.gif" alt="" class="seckey-loading-status" /><img src="https://cfl.dropboxstatic.com/static/images/icons/icon_spacer-vflN3BYt2.gif" style="display:none" class="seckey-loading-status sprite sprite_web s_web_bulletpoint-check" /></p>
                        After inserting, tap your key if it has a button or gold disk.
                     </div>
                  </div>
                  <div data-js-component-id="component2094695769983672202" tabindex="-1" id="pyxl2094695769983672200" class="text-input login-text-input standard">
                     <div class="text-input-error-wrapper">
                        <form:error name="code" />
                        <div data-error-field-name="code"></div>
                     </div>
                     <div class="text-input-wrapper"><input class="text-input-input" style="display:none" type="text" id="pyxl2094695769983672201" name="code" /> <label style="" for="pyxl2094695769983672201"></label></div>
                     <small class="secondary-label"></small>
                  </div>
                  <div style="display:none;" class="two-factor-seckey-instructions">
                     <div style="color:red"><span class="error-msg">Key not found.</span></div>
                     <button class="two-factor-seckey-retry button-tertiary">Retry</button>
                  </div>
                  <div class="two-factor-use-phone-instead"><a href="" class="two-factor-uses-sms">Send SMS instead</a><a href="" class="two-factor-uses-authenticator">Use mobile authenticator instead</a></div>
               </form>
            </div>
         </div>
         <div class="login-register-switch"><a href="#" class="login-register-switch-link">New to Dropbox? Create an account</a></div>
      </div>
      <div class="register-part">
         <div class="login-header">Sign up for Dropbox to link with <span class="app-name">Kroms Image Slider</span></div>
         <div data-js-component-id="component2094695769983672203" class="login-form-container form_shown register standard">
            <form action="/ajax_register" method="post" class="clearfix credentials-form register-form">
               <input type="hidden" name="cont" value="https://www.dropbox.com/oauth2/authorize?client_id=h9fot2c8bxz7gcg&amp;response_type=code" /><input type="hidden" name="signup_data" value="7310064" /><input type="hidden" name="signup_tag" value="oauth" />
               <div class="credentials-form__fields">
                  <div class="register-form__name-fields">
                     <div data-js-component-id="component2094695769983672206" tabindex="-1" id="pyxl2094695769983672204" class="input-fname text-input__margin-right text-input standard first">
                        <div class="text-input-error-wrapper">
                           <form:error name="fname" />
                           <div data-error-field-name="fname"></div>
                        </div>
                        <div class="text-input-wrapper"><input name="fname" id="pyxl2094695769983672205" type="text" class="text-input-input autofocus" /> <label style="" for="pyxl2094695769983672205">First name</label></div>
                        <small class="secondary-label"></small>
                     </div>
                     <div data-js-component-id="component2094695769983672209" tabindex="-1" id="pyxl2094695769983672207" class="input-lname second text-input standard">
                        <div class="text-input-error-wrapper">
                           <form:error name="lname" />
                           <div data-error-field-name="lname"></div>
                        </div>
                        <div class="text-input-wrapper"><input name="lname" id="pyxl2094695769983672208" type="text" class="text-input-input autofocus" /> <label style="" for="pyxl2094695769983672208">Last name</label></div>
                        <small class="secondary-label"></small>
                     </div>
                  </div>
                  <div class="register-form__credential-fields">
                     <div data-js-component-id="component2094695769983672212" tabindex="-1" id="pyxl2094695769983672210" class="input-email text-input__margin-right text-input standard">
                        <div class="text-input-error-wrapper">
                           <form:error name="email" />
                           <div data-error-field-name="email"></div>
                        </div>
                        <div class="text-input-wrapper"><input class="text-input-input" type="email" name="email" id="pyxl2094695769983672211" /> <label style="" for="pyxl2094695769983672211">Email</label></div>
                        <small class="secondary-label"></small>
                     </div>
                     <div class="email-suggestion"></div>
                     <div data-js-component-id="component2094695769983672215" tabindex="-1" id="pyxl2094695769983672213" class="input-password text-input standard">
                        <div class="text-input-error-wrapper">
                           <form:error name="password" />
                           <div data-error-field-name="password"></div>
                        </div>
                        <div class="text-input-wrapper">
                           <input autocomplete="off" class="password-input text-input-input" type="password" name="password" id="pyxl2094695769983672214" /> <label style="" for="pyxl2094695769983672214">Password</label>
                           <div data-js-component-id="component2094695769983672216" class="bubble-dropdown-container">
                              <div aria-label="Password strength" class="password-input-meter standard bubble-dropdown-target bubble-dropdown-target" aria-describedby="password-desc" tabindex="-1">
                                 <div class="password-input-dot"></div>
                                 <div class="password-input-dot"></div>
                                 <div class="password-input-dot"></div>
                                 <div class="password-input-dot"></div>
                              </div>
                              <div class="bubble-dropdown left">
                                 <div class="password-bubble-title"></div>
                                 <div id="password-desc" class="password-bubble-desc">Good passwords are hard to guess. Use uncommon words or inside jokes, non-standard uPPercasing, creative spelllling, and non-obvious numbers and symbols</div>
                                 <div class="bubble-arrow-border"></div>
                                 <div class="bubble-arrow"></div>
                              </div>
                           </div>
                           <div class="password-caps-indicator">Caps lock is currently on</div>
                        </div>
                        <small class="secondary-label"></small>
                     </div>
                  </div>
               </div>
               <div class="recaptcha-v2-challenge-container recaptcha-v2-challenge-container--invisible">
                  <div class="recaptcha-terms-text">This page is protected by reCAPTCHA, and subject to the Google<a href="https://www.google.com/policies/privacy/" target="_blank" rel="noreferrer"> Privacy Policy </a>and<a href="https://www.google.com/policies/terms/" target="_blank" rel="noreferrer"> Terms of Service</a>.</div>
                  <div class="text-input-error-wrapper">
                     <form:error name="recaptcha_response" />
                     <div data-error-field-name="recaptcha_response"></div>
                  </div>
                  <div class="recaptcha_v2_challenge" id="pyxl2094695769983672217"></div>
               </div>
               <div class="checkbox checkbox-inline agree standard">
                  <div class="text-input-error-wrapper">
                     <form:error name="tos_agree" />
                     <div data-error-field-name="tos_agree"></div>
                  </div>
                  <input type="checkbox" id="pyxl2094695769983672218" name="tos_agree" /><label class="checkbox_label" for="pyxl2094695769983672218"><span>I agree to the <a href="/terms" target="_blank" rel="noreferrer">Dropbox Terms</a></span></label>
               </div>
               <button disabled="True" type="submit" class="login-button button-primary">Create an account</button> 
            </form>
         </div>
         <div class="login-register-switch"><a href="#" class="login-register-switch-link">Sign in</a></div>
      </div>
   </div>
</div>
)};

export default DropBoxLogin;