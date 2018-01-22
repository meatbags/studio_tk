<div class='about trigger' data-title='ABOUT'>
  <div class='about__inner'>
    <div class='about__inner__text text-large'>
      <?php echo get_page_by_title('about')->post_content; ?>
    </div>
    <div class='about__inner__subscribe font-serif'>
      <span class='transparent text-tiny'>
      For more insights and previews subscribe to our Newsletter<br />
      and follow us on <a target='_blank' href='https://www.instagram.com/teuberkohlhoff/'>Instagram</a> & <a target='_blank' href='https://www.facebook.com/teuberkohlhoff/'>Facebook</a>.<br /><br />
      </span>
      <span class='text-small'>
        <?php get_template_part('newsletter'); ?>
      </span>
    </div>
  </div>
</div>
