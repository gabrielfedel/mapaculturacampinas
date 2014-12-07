<?php

 /**
 * Honor Thy Contributors plugin for Omeka
 * 
 * @copyright Copyright 2013 Lincoln A. Mullen
 * @license http://www.gnu.org/licenses/gpl-3.0.txt GNU GPLv3
 *
 */

echo head(); ?>

<div id="primary">

  <?php 

  echo "<h1>" . get_option('honor_thy_contributors_page_title') . "</h1>";

  echo "<p>" . get_option('honor_thy_contributors_pre_text') . "</p>";

  ?> 
  <table>
    <tr>
      <th>Name</th>
      <th>Records contributed</th>
    </tr>
    <?php
    $db = get_db();

    $sql = "
    SELECT `text`, COUNT(`text`)
    FROM `omeka_element_texts`
    WHERE `element_id` = ".get_option('honor_thy_contributors_element_id')."
    GROUP BY `text`";

    $contributors = $db->query($sql)->fetchall();
    foreach ($contributors as $contributor) {
  
      // Construct a url to the items the person has contributed
      $search_link =  url('items/browse', array(
        'search' => '',
        'advanced[0][element_id]' => 
          get_option('honor_thy_contributors_element_id'),
        'advanced[0][type]' => 'is exactly',
        'advanced[0][terms]' => $contributor['text'],
        'submit_search' => 'Search'));

      // Create the table that displays the contributors
      echo "<tr>";
      echo "<td><a href='" . $search_link ."'>" . $contributor['text'] . "</a></td>";
      echo "<td>" . $contributor['COUNT(`text`)'] . "</td>";
      echo "</tr>";
    }
    ?>
  </table>

  <?php echo "<p>" . get_option('honor_thy_contributors_post_text') . "</p>"; ?>

</div>

<?php echo foot(); ?>
