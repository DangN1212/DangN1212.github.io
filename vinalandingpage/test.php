<?php
$arrError = array();
$result = array();
  if(!empty($_POST['user']) && !empty($_POST['comp']) && !empty($_POST['mail']) && !empty($_POST['phone'])){
      if (!filter_var($_POST['mail'], FILTER_VALIDATE_EMAIL))
            $arrError['email'] = 'Định dạng email không đúng';
      if(!preg_match("/^0[\d]{7,13}$/", $_POST['phone']))
			      $arrError['phone'] = 'Số điện thoại không đúng';
      if($arrError) $result['error'] = $arrError;
      else $result['success'] = 1;
      echo json_encode($result, JSON_UNESCAPED_UNICODE);
  }
  
?>