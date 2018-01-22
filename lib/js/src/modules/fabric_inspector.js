import Vector from './vector';
import Limit from './limit';

class FabricInspector {
  constructor() {
    // fabric inspection widget

    this.panAmount = 0.45;
    this.active = false;
    this.id = null;
    this.parent = null;
    this.target = null;
    this.offset = new Vector();
    this.limit = {
      x: new Limit(),
      y: new Limit()
    };
    this.mouse = {
      start: new Vector(),
      current: new Vector(),
      delta: new Vector()
    };

    // set up

    this.conformImages();
    this.events();
  }

  conformImages() {
    // conform all images

    $('.inspector__image').each((i, img) => {
      const $e = $(img);

      if (!$e.hasClass('formatted')) {
        // resize, reposition

        this.resize(img);
        img.onload = () => { this.resize(img); };

        // register

        $e.addClass('formatted');
      }
    });
  }

  resize(image) {
    // resize and position image

    let x = -image.naturalWidth * 0.5;
    let y = -image.naturalHeight * 0.25;

    $(image).css({
      position: 'absolute',
      width: image.naturalWidth * 1.25 + 'px',
      height: image.naturalHeight * 1.25 + 'px',
      top: 0,
      left: 0,
      transform: this.getTransformString(x, y)
    })
  }

  doc() {
    // setup doc

    if (isHome || $('.inspector').length) {
      // resize images

      $('.inspector__image').each((i, e) => {
        const target = e.currentTarget;
        this.resize(target);
        target.onload = () => { this.resize(target); };
      });

      // set events

      this.events();
    }
  }

  deactivate() {
    this.active = false;
  }

  events() {
    // dom events

    $('body').on('mouseover', '.inspector', (e) => {
			// get selectors, init transform

      const $e = $(e.currentTarget);
      this.active = true;
      this.id = `#${$($e).attr('id')}`;
      this.mouse.start.set(e.clientX, e.clientY);
      this.parent = $(this.id);
      this.target = $(this.id + ' .inspector__image');
      this.offset.set(this.target.position().left, this.target.position().top);

			// set limits

			const w0 = this.target.outerWidth();
			const h0 = this.target.outerHeight();
			const w1 = this.parent.outerWidth();
			const h1 = this.parent.outerHeight();

      this.limit.x.set(-(w0 - w1), 0);
      this.limit.y.set(-(h0 - h1), 0);
		});

		$('body').on('mousemove', (e) => {
      // handle mouse

      if (this.active) {
        this.mouse.current.set(e.clientX, e.clientY);
        this.mouse.delta.set(e.clientX - this.mouse.start.x, e.clientY - this.mouse.start.y);

        // get new position

        const x = this.limit.x.clamp(this.mouse.delta.x * this.panAmount + this.offset.x);
        const y = this.limit.y.clamp(this.mouse.delta.y * this.panAmount + this.offset.y);

        // css transform

        this.target.css('transform', this.getTransformString(x, y));
      }
    });

    // deactivation events

		$('body').on('mouseout', '.inspector', () => { this.deactivate(); });
    $('body').on('mouseup', () => { this.deactivate(); });
    $(document).mouseleave(() => { this.deactivate(); });
  }

  getTransformString(x, y) {
    // get css transform string

    return `translate(${x}px, ${y}px)`;
  }
}

export default FabricInspector;
